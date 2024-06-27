import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import LoginPage, { action as loginAction } from "./pages/LoginPage";
import RegisterPage, { action as registerAction } from "./pages/RegisterPage";
import MonthlyRevenuesPage, {
  loader as monthlyRevenuesLoader,
} from "./pages/MonthlyRevenuesPage";
import YearlyRevenuesPage, {
  loader as yearlyRevenuesLoader,
} from "./pages/YearlyRevenuesPage";
import DailyRevenuesPage, {
  loader as dailyRevenuesLoader,
} from "./pages/DailyRevenuesPage";
import OtPage, { action as otAction } from "./pages/OtPage";
import MonthlyExpensesPage, {
  loader as monthlyExpensesLoader,
  action as addExpenseAction,
} from "./pages/MonthlyExpensesPage";
import InvoicesPage, {
  loader as invoicesLoader,
  action as invoiceAction,
} from "./pages/InvoicesPage";
import RefundsPage, {loader as refundsLoader, action as refundAction} from "./pages/RefundsPage";
import CompaniesPage, {
  loader as companiesLoader,
  action as companiesAction,
} from "./pages/CompaniesPage";
import SummaryPage, {loader as sumLoader} from "./pages/SummaryPage";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "przychody/dzien",
        element: <DailyRevenuesPage />,
        loader: dailyRevenuesLoader,
      },
      {
        path: "przychody/msc",
        element: <MonthlyRevenuesPage />,
        loader: monthlyRevenuesLoader,
      },
      {
        path: "przychody/rok",
        element: <YearlyRevenuesPage />,
        loader: yearlyRevenuesLoader,
      },
      { path: "ot", element: <OtPage />, action: otAction },
      {
        path: "koszty",
        element: <MonthlyExpensesPage />,
        loader: monthlyExpensesLoader,
        action: addExpenseAction,
      },
      {
        path: "faktury",
        element: <InvoicesPage />,
        loader: invoicesLoader,
        action: invoiceAction,
      },
      { path: "zwroty", element: <RefundsPage />, loader: refundsLoader, action: refundAction},
      {
        path: "firmy",
        element: <CompaniesPage />,
        loader: companiesLoader,
        action: companiesAction,
      },
      { path: "podsumowanie", element: <SummaryPage />, loader: sumLoader },
    ],
  },
  { path: "login", element: <LoginPage />, action: loginAction },
  { path: "register", element: <RegisterPage />, action: registerAction },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
