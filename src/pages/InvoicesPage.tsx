import { json, defer, useLoaderData, Await } from "react-router-dom";
import { Suspense, useState } from "react";
import { getAuthToken } from "../util/auth";
import { InvoicesPageResponse } from "../util/InvoiceType";
import { Company } from "../util/CompanyType";
import PulseLoaderWrapper from "../components/WrappingContainers/PulseLoaderWrapper";
import InvoicesTable from "../components/Invoices/InvoicesTable";
import { motion } from "framer-motion";
import { useRedirect } from "../hooks/useRedirect";
import InvoiceAddForm from "../components/Invoices/InvoiceAddForm";
import AddButton from "../components/Buttons/AddButton";
import InvoiceFilterForm from "../components/Invoices/InvoiceFilterForm";
import { InvoiceSearchParams } from "../util/InvoiceType";

export default function InvoicesPage() {
  const { invoicesPage, companies } = useLoaderData() as any;
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);

  useRedirect({
    data: invoicesPage,
    message: "Could not fetch invoices data.",
  });

  return (
    <div className="h-full w-[90%] mx-auto flex justify-center">
      <Suspense fallback={<PulseLoaderWrapper />}>
        <Await resolve={invoicesPage}>
          {(loadedInvoicesPage: InvoicesPageResponse) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <InvoicesTable invoices={loadedInvoicesPage.results} />
              <div className="flex justify-end m-0 gap-10">
                <AddButton onClick={() => setFilterModalIsOpen(true)}>
                  Filtruj
                </AddButton>
                <AddButton onClick={() => setAddModalIsOpen(true)}>
                  Dodaj fakturę
                </AddButton>
              </div>
            </motion.div>
          )}
        </Await>
        <Await resolve={companies}>
          {(loadedCompanies: Company[]) => (
            <>
              <InvoiceAddForm
                addModalIsOpen={addModalIsOpen}
                setAddModalIsOpen={setAddModalIsOpen}
                companies={loadedCompanies}
              />
              <InvoiceFilterForm
                filterModalIsOpen={filterModalIsOpen}
                setFilterModalIsOpen={setFilterModalIsOpen}
                companies={loadedCompanies}
              />
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

async function loadInvoices() {
  const token = await getAuthToken();
  let search = localStorage.getItem("searchInvoiceData");
  let params = "?";
  if (search) {
    let invoiceSearchParams: InvoiceSearchParams = JSON.parse(search);
    if (invoiceSearchParams.invoiceNumber) {
      params += `InvoiceNumber=${invoiceSearchParams.invoiceNumber}&`;
    }
    if (invoiceSearchParams.paymentType) {
      params += `PaymentType=${invoiceSearchParams.paymentType}&`;
    }
    if (invoiceSearchParams.from) {
      params += `From=${invoiceSearchParams.from}&`;
    }
    if (invoiceSearchParams.to) {
      params += `To=${invoiceSearchParams.to}&`;
    }
    if (invoiceSearchParams.isPaid !== undefined) {
      params += `IsPaid=${invoiceSearchParams.isPaid ? "true" : "false"}&`;
    }
    if (invoiceSearchParams.companyId !== undefined) {
      params += `companyId=${invoiceSearchParams.companyId}&`;
    }
  }

  const response = await fetch(
    `http://192.168.1.31:8001/invoices/search/${params}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );

  if (!response.ok) {
    return json(
      { message: "Could not fetch invoices." },
      { status: response.status }
    );
  } else {
    const responseData: InvoicesPageResponse = await response.json();
    return responseData;
  }
}

async function loadCompanies() {
  const token = await getAuthToken();
  const response = await fetch("http://192.168.1.31:8001/companies", {
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    return json(
      { message: "Could not fetch companies data." },
      { status: response.status }
    );
  } else {
    const responseData: Company[] = await response.json();
    return responseData;
  }
}

export function loader() {
  return defer({
    invoicesPage: loadInvoices(),
    companies: loadCompanies(),
  });
}

type RequestProps = {
  request: Request;
};

export async function action({ request }: RequestProps) {
  const formData = await request.formData();
  let intent = formData.get("intent");
  const token = await getAuthToken();

  if (intent === "edit") {
    const invoiceData = {
      invoiceNumber: formData.get("invoiceNumber"),
      bruttoValue: formData.get("bruttoValue"),
      vatValue: formData.get("vatValue"),
      deadLine: formData.get("deadLine"),
    };

    const response = await fetch(
      `http://192.168.1.31:8001/invoices/${formData.get("id")}`,
      {
        method: "PATCH",
        body: JSON.stringify(invoiceData),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!response.ok) {
      throw json(
        { message: "Could not edit invoice." },
        { status: response.status }
      );
    }
    return response;
  } else if (intent === "pay") {
    const response = await fetch(
      `http://192.168.1.31:8001/invoices/${formData.get("id")}/pay`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (!response.ok) {
      throw json(
        { message: "Could not change payment status." },
        { status: response.status }
      );
    }
    return response;
  } else if (intent === "delete") {
    const response = await fetch(
      `http://192.168.1.31:8001/invoices/${formData.get("id")}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (!response.ok) {
      throw json(
        { message: "Could not delete invoice." },
        { status: response.status }
      );
    }
    return response;
  } else if (intent === "add_invoice") {
    const invoiceData = {
      companyId: Number(formData.get("companyId")),
      invoiceNumber: formData.get("invoiceNumber"),
      vatValue: Number(formData.get("vatValue")),
      bruttoValue: Number(formData.get("bruttoValue")),
      invoiceType: Number(formData.get("invoiceType")),
      paymentType:  Number(formData.get("paymentType")),
      paymentDeadlineDate: formData.get("paymentDeadlineDate"),
    };
    const response = await fetch("http://192.168.1.31:8001/invoices", {
      method: "POST",
      body: JSON.stringify(invoiceData),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      throw json(
        { message: "Could not edit invoice." },
        { status: response.status }
      );
    }
    return response;
  } else if (intent === "search") {
    const searchInvoiceData = {
      invoiceNumber: formData.get("invoiceNumber"),
      companyId: formData.get("companyId"),
      paymentType: formData.get("paymentType"),
      from: formData.get("from"),
      to: formData.get("to"),
      isPaid:
        formData.get("isPaid") === "NULL"
          ? null
          : Boolean(Number(formData.get("isPaid"))),
      pageNumber: formData.get("pageNumber"),
      pageSize: formData.get("pageSize"),
    };

    localStorage.setItem(
      "searchInvoiceData",
      JSON.stringify(searchInvoiceData)
    );

    return json({ message: "" }, { status: 200 });
  }
}
