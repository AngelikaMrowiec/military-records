import { json, defer, useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import { DailyRevenue } from "../util/RevenueTypes";
import PulseLoaderWrapper from "../components/WrappingContainers/PulseLoaderWrapper";
import DailyRevenuesTables from "../components/DailyRevenues/DailyRevenuesTables";
import { getAuthToken } from "../util/auth";
import { motion } from "framer-motion";
import { useRedirect } from "../hooks/useRedirect";


export default function DailyRevenuesPage() {
  const { dailyRevenues } = useLoaderData() as any;

  useRedirect({
    data: dailyRevenues,
    message: "Could not fetch daily revenues data." 
  });

  return (
    <div className="h-full w-3/4 mx-auto flex justify-center">
      <Suspense fallback={<PulseLoaderWrapper />}>
        <Await resolve={dailyRevenues}>
          {(loadedDailyRevenues: DailyRevenue[]) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-[90%]"
            >
              <DailyRevenuesTables dailyRevenues={loadedDailyRevenues} />
            </motion.div>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

async function loadDailyRevenues() {
  const token = await getAuthToken();
  const response = await fetch("http://192.168.1.31:8001/earnings/daily", {
    headers: { Authorization: "Bearer " + token },
  });


  if (!response.ok) {
    return json(
      { message: "Could not fetch daily revenues data." },
      { status: response.status }
    );
  } else {
    const responseData: DailyRevenue[] = await response.json();
    return responseData;
  }
}

export function loader() {
  return defer({
    dailyRevenues: loadDailyRevenues(),
  });
}
