import { json, defer, Await, useLoaderData } from "react-router-dom";
import { Suspense, useState } from "react";
import { MonthlyExpense, Category } from "../util/ExpenseTypes";
import PulseLoaderWrapper from "../components/WrappingContainers/PulseLoaderWrapper";
import MonthlyExpensesChart from "../components/Expenses/MonthlyExpensesChart";
import AddExpenseForm from "../components/Expenses/AddExpenseForm";
import { getAuthToken } from "../util/auth";
import { motion } from "framer-motion";
import MonthlyExpensesTable from "../components/Expenses/MonthlyExpensesTable";
import SwitchButton from "../components/Buttons/SwitchButton";
import AddButton from "../components/Buttons/AddButton";
import { useRedirect } from "../hooks/useRedirect";

export default function MonthlyExpensesPage() {
  const { monthlyExpenses } = useLoaderData() as any;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [content, setContent] = useState(true);

  useRedirect({
    data: monthlyExpenses,
    message: "Could not fetch monthly expenses data.",
  });

  return (
    <div className="flex items-center flex-col h-5/6">
      <SwitchButton onClick={setContent} />
      <Suspense fallback={<PulseLoaderWrapper />}>
        <Await resolve={monthlyExpenses}>
          {(loadedMonthlyExpenses: MonthlyExpense[]) => (
            <>
              {content && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <MonthlyExpensesChart
                    monthlyExpenses={loadedMonthlyExpenses}
                  />
                </motion.div>
              )}
              {!content && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-[90%]"
                >
                  <MonthlyExpensesTable
                    monthlyExpenses={loadedMonthlyExpenses}
                  />
                  <div className="flex justify-end mx-48 px-56">
                    <AddButton onClick={() => setModalIsOpen(true)}>
                      Dodaj wydatek
                    </AddButton>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </Await>
      </Suspense>
      <AddExpenseForm
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  );
}

async function loadMontlhyExpenses() {
  const token = await getAuthToken();
  const response = await fetch("http://192.168.1.31:8001/expenses", {
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    return json(
      { message: "Could not fetch monthly expenses data." },
      { status: response.status }
    );
  } else {
    const responseData: MonthlyExpense[] = await response.json();
    return responseData;
  }
}

async function loadCategories() {
  const token = await getAuthToken();

  const response = await fetch("http://192.168.1.31:8001/expenses/categories", {
    headers: { Authorization: "Bearer " + token },
  });

  // if (response.status === 401) {
  //   redirect("/login");
  // }

  if (!response.ok) {
    return json(
      { message: "Could not fetch categories." },
      { status: response.status }
    );
  } else {
    const responseData: Category[] = await response.json();
    return responseData;
  }
}

export function loader() {
  return defer({
    monthlyExpenses: loadMontlhyExpenses(),
    categories: loadCategories(),
  });
}

type RequestProps = {
  request: Request;
};
export async function action({ request }: RequestProps) {
  const formData = await request.formData();
  let intent = formData.get("intent");
  const token = await getAuthToken();

  if (intent === "add_expense") {
    const expenseData = {
      categoryId: formData.get("categoryId"),
      value: formData.get("value"),
      date: formData.get("date"),
    };

    const response = await fetch("http://192.168.1.31:8001/expenses", {
      method: "POST",
      body: JSON.stringify(expenseData),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw json(
        { message: "Could not add expense." },
        { status: response.status }
      );
    }
    return response;
  } else if (intent === "add_category") {
    const addedCategoryData = {
      name: formData.get("name"),
    };

    const response = await fetch(
      "http://192.168.1.31:8001/expenses/categories",
      {
        method: "POST",
        body: JSON.stringify(addedCategoryData),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (!response.ok) {
      throw json(
        { message: "Could not add new category." },
        { status: response.status }
      );
    }
    return response;
  } else if (intent === "edit") {
    const expenseData = {
      value: formData.get("value"),
    };

    const response = await fetch(
      `http://192.168.1.31:8001/expenses/${formData.get("id")}`,
      {
        method: "PATCH",
        body: JSON.stringify(expenseData),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!response.ok) {
      throw json({ message: "Could not edit expense." }, { status: 500 });
    }
    return response;
  } else if (intent === "delete") {
    const response = await fetch(
      `http://192.168.1.31:8001/expenses/${formData.get("id")}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!response.ok) {
      throw json({ message: "Could not delete expense." }, { status: 500 });
    }
    return response;
  }
}
