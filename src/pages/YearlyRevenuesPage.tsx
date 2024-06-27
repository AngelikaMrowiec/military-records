import { json, defer, useLoaderData, Await } from "react-router-dom";
import { Suspense, useState } from "react";
import PulseLoaderWrapper from "../components/WrappingContainers/PulseLoaderWrapper";
import { motion } from "framer-motion";
import { YearlyRevenue } from "../util/RevenueTypes";
import SwitchButton from "../components/Buttons/SwitchButton";
import YearlyRevenuesChart from "../components/YearlyRevenues/YearlyRevenuesChart";
import YearlyRevenuesTable from "../components/YearlyRevenues/YearlyRevenuesTable";
import { getAuthToken } from "../util/auth";
import { useRedirect } from "../hooks/useRedirect";

export default function YearlyRevenuesPage() {
  const { yearlyRevenues } = useLoaderData() as any;
  const [content, setContent] = useState(true);

  useRedirect({
    data: yearlyRevenues,
    message: "Could not fetch yearly revenues data.",
  });

  function sortAsc(loadedYearlyRevenues: YearlyRevenue[]) {
    const copiedLoadedYearlyRevenues = [...loadedYearlyRevenues];
    copiedLoadedYearlyRevenues.sort(
      (a, b) => new Date(a.year).getTime() - new Date(b.year).getTime()
    );
    return copiedLoadedYearlyRevenues;
  }

  function sortDsc(loadedYearlyRevenues: YearlyRevenue[]) {
    const copiedLoadedYearlyRevenues = [...loadedYearlyRevenues];
    copiedLoadedYearlyRevenues.sort(
      (a, b) => new Date(b.year).getTime() - new Date(a.year).getTime()
    );
    return copiedLoadedYearlyRevenues;
  }

  return (
    <>
      <SwitchButton onClick={setContent} />
      <div className="h-full w-5/6 mx-auto flex justify-center">
        <Suspense fallback={<PulseLoaderWrapper />}>
          <Await resolve={yearlyRevenues}>
            {(loadedYearlyRevenues: YearlyRevenue[]) => (
              <>
                {content && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <YearlyRevenuesChart
                      yearlyRevenues={sortAsc(loadedYearlyRevenues)}
                    />
                  </motion.div>
                )}
                {!content && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-4/5 w-4/5"
                  >
                    <YearlyRevenuesTable
                      yearlyRevenues={sortDsc(loadedYearlyRevenues)}
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

async function loadYearlyRevenues() {
  const token = await getAuthToken();
  const response = await fetch("http://192.168.1.31:8001/earnings/yearly", {
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    return json(
      { message: "Could not fetch yearly revenues data." },
      { status: response.status }
    );
  } else {
    const responseData: YearlyRevenue[] = await response.json();
    return responseData;
  }
}

export function loader() {
  return defer({
    yearlyRevenues: loadYearlyRevenues(),
  });
}
