import { json, defer, useLoaderData, Await } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";
import PulseLoaderWrapper from "../components/WrappingContainers/PulseLoaderWrapper";
import { getAuthToken } from "../util/auth";
import { Company } from "../util/CompanyType";
import CompaniesTable from "../components/Companies/CompaniesTable";
import AddCompanyForm from "../components/Companies/AddCompanyForm";
import AddButton from "../components/Buttons/AddButton";
import { motion } from "framer-motion";
import { useRedirect } from "../hooks/useRedirect";

export default function CompaniesPage() {
  const { companies } = useLoaderData() as any;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useRedirect({
    data: companies,
    message: "Could not fetch companies data.",
  });

  useEffect(() => {
    document.body.addEventListener("click", () => {
      setModalIsOpen(false);
    });
  });

  return (
    <div className="flex items-center flex-col h-5/6">
      <Suspense fallback={<PulseLoaderWrapper />}>
        <Await resolve={companies}>
          {(loadedCompanies: Company[]) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-[90%]"
            >
              <CompaniesTable companies={loadedCompanies} />
              <div className="flex justify-end mx-48 px-56">
                <AddButton onClick={() => setModalIsOpen(true)}>
                  Dodaj nową firmę
                </AddButton>
              </div>
            </motion.div>
          )}
        </Await>
      </Suspense>
      <AddCompanyForm
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  );
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

  if (intent === "add_company") {
    const companyData = {
      name: formData.get("name"),
      bankAccountNumber: formData.get("bankAccountNumber"),
    };

    const response = await fetch("http://192.168.1.31:8001/companies", {
      method: "POST",
      body: JSON.stringify(companyData),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw json({ message: "Could not add company data." }, { status: 500 });
    }
    return response;
  } else if (intent === "edit") {
    const companyData = {
      name: formData.get("name"),
      bankAccountNumber: formData.get("bankAccountNumber"),
    };

    const response = await fetch(
      `http://192.168.1.31:8001/companies/${formData.get("id")}`,
      {
        method: "PATCH",
        body: JSON.stringify(companyData),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!response.ok) {
      throw json({ message: "Could not edit company data." }, { status: 500 });
    }
    return response;
  }
}
