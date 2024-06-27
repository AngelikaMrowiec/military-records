import { getAuthToken } from "../util/auth";
import { defer, json, useLoaderData, Await } from "react-router-dom";
import { Refund } from "../util/RefundType";
import RefundsTable from "../components/Refunds/RefundsTable";
import PulseLoaderWrapper from "../components/WrappingContainers/PulseLoaderWrapper";
import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import { useRedirect } from "../hooks/useRedirect";
import AddButton from "../components/Buttons/AddButton";
import RefundAddForm from "../components/Refunds/RefundAddForm";

export default function RefundsPage() {
  const { refunds } = useLoaderData() as any;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useRedirect({
    data: refunds,
    message: "Could not fetch refunds data.",
  });

  return (
    <div className="h-full w-[90%] mx-auto flex justify-center">
      <Suspense fallback={<PulseLoaderWrapper />}>
        <Await resolve={refunds}>
          {(loadedRefunds: Refund[]) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <RefundsTable refunds={loadedRefunds} />
              <div className="flex justify-end m-0">
                <AddButton onClick={() => setModalIsOpen(true)}>
                  Dodaj zwrot
                </AddButton>
              </div>
            </motion.div>
          )}
        </Await>
      </Suspense>
      <RefundAddForm
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  );
}

async function loadRefunds() {
  const token = await getAuthToken();
  const response = await fetch("http://192.168.1.31:8001/refunds", {
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    return json(
      { message: "Could not fetch refunds data." },
      { status: response.status }
    );
  } else {
    const responseData: Refund[] = await response.json();
    return responseData;
  }
}

export function loader() {
  return defer({
    refunds: loadRefunds(),
  });
}

type RequestProps = {
  request: Request;
};

export async function action({ request }: RequestProps) {
  const formData = await request.formData();
  let intent = formData.get("intent");
  const token = await getAuthToken();

  if (intent === "add_refund") {
    const refundData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      value: formData.get("value"),
      orderNumber: formData.get("orderNumber"),
      description: formData.get("description"),
    };

    const response = await fetch("http://192.168.1.31:8001/refunds", {
      method: "POST",
      body: JSON.stringify(refundData),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw json(
        { message: "Could not add refund." },
        { status: response.status }
      );
    }
    return response;
  } else if (intent === "refund") {
    const response = await fetch(
      `http://192.168.1.31:8001/refunds/${formData.get("id")}/refund`,
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
        { message: "Could change refund status." },
        { status: response.status }
      );
    }
    return response;
  } else if (intent === "delete") {
    const response = await fetch(
      `http://192.168.1.31:8001/refunds/${formData.get("id")}`,
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
        { message: "Could not delete refund." },
        { status: response.status }
      );
    }
    return response;
  }
}
