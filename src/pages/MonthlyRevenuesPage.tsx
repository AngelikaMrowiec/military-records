import { json, defer, useLoaderData, Await } from "react-router-dom";
import { Suspense, useState } from "react";
import PulseLoaderWrapper from "../components/WrappingContainers/PulseLoaderWrapper";
import { motion } from "framer-motion";
import { MonthlyRevenue } from "../util/RevenueTypes";
import MonthlyRevenuesChart from "../components/MonthlyRevenues/MonthlyRevenuesChart";
import MonthlyRevenuesTable from "../components/MonthlyRevenues/MonthlyRevenuesTable";
import SwitchButton from "../components/Buttons/SwitchButton";
import { getAuthToken } from "../util/auth";
import { useRedirect } from "../hooks/useRedirect";

export default function MonthlyRevenuesPage() {
  const { monthlyRevenues } = useLoaderData() as any;
  const [content, setContent] = useState(true);

  useRedirect({
    data: monthlyRevenues,
    message: "Could not fetch monthly revenues data." 
  });

  function sortAsc(loadedMonthlyRevenues: MonthlyRevenue[]) {
    const copiedLoadedMonthlyRevenues = [...loadedMonthlyRevenues];
    copiedLoadedMonthlyRevenues.sort(
      (a, b) =>
        new Date(a.yearMonth).getTime() - new Date(b.yearMonth).getTime()
    );
    return copiedLoadedMonthlyRevenues;
  }

  function sortDsc(loadedMonthlyRevenues: MonthlyRevenue[]) {
    const copiedLoadedMonthlyRevenues = [...loadedMonthlyRevenues];
    copiedLoadedMonthlyRevenues.sort(
      (a, b) =>
        new Date(b.yearMonth).getTime() - new Date(a.yearMonth).getTime()
    );
    return copiedLoadedMonthlyRevenues;
  }

  return (
    <>
      <SwitchButton onClick={setContent} />
      <div className="h-full w-5/6 mx-auto flex justify-center">
        <Suspense
          fallback={<PulseLoaderWrapper />}
        >
          <Await resolve={monthlyRevenues}>
            {(loadedMonthlyRevenues: MonthlyRevenue[]) => (
              <>
                {content && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <MonthlyRevenuesChart
                      monthlyRevenues={sortAsc(loadedMonthlyRevenues)}
                    />
                  </motion.div>
                )}
                {!content && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-4/5 w-4/5"
                  >
                    <MonthlyRevenuesTable
                      monthlyRevenues={sortDsc(loadedMonthlyRevenues)}
                    />
                  </motion.div>
                )}
              </>
            )}
          </Await>
        </Suspense>
      </div>
    </>
  );
}

async function loadMonthlyRevenues() {
  const token = await getAuthToken();
  const response = await fetch("http://192.168.1.31:8001/earnings/monthly", {
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    return json(
      { message: "Could not fetch monthly revenues data." },
      { status: response.status }
    );
  } else {
    const responseData: MonthlyRevenue[] = await response.json();
    return responseData;
  }
}

export function loader() {
  return defer({
    monthlyRevenues: loadMonthlyRevenues(),
  });
}
