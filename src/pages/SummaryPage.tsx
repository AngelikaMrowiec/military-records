import { MonthlySummary, YearlySummary } from "../util/SummaryType";
import { getAuthToken } from "../util/auth";
import { Suspense } from "react";
import { json, defer, useLoaderData, Await } from "react-router-dom";
import { useRedirect } from "../hooks/useRedirect";
import PulseLoaderWrapper from "../components/WrappingContainers/PulseLoaderWrapper";
import SummaryMonthlyChart from "../components/Summary/SummaryMonthlyChart";
import SummaryYearlyChart from "../components/Summary/SummaryYearlyChart";

export default function SummaryPage() {
  const { monthlySumData, yearlySumData } = useLoaderData() as any;

  useRedirect({
    data: monthlySumData,
    message: "Could not fetch summary data.",
  });

  return (
    <Suspense fallback={<PulseLoaderWrapper />}>
      <Await resolve={monthlySumData}>
        {(loadedMonthlySumData: MonthlySummary[]) => (
          <SummaryMonthlyChart monthlySumData={loadedMonthlySumData} />
        )}
      </Await>
       <Await resolve={yearlySumData}>
        {(loadedYearlySumData: YearlySummary[]) => (
          <SummaryYearlyChart yearlySumData={loadedYearlySumData} />
        )}
      </Await>
    </Suspense>
  );
}

async function loadYearlySummary() {
  const token = await getAuthToken();
  const response = await fetch("http://192.168.1.31:8001/summary/yearly", {
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    return json(
      { message: "Could not fetch summary data." },
      { status: response.status }
    );
  } else {
    const responseData: YearlySummary[] = await response.json();
    return responseData;
  }
}

async function loadMonthlySummary() {
  const token = await getAuthToken();
  const response = await fetch("http://192.168.1.31:8001/summary/monthly", {
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    return json(
      { message: "Could not fetch summary data." },
      { status: response.status }
    );
  } else {
    const responseData: MonthlySummary[] = await response.json();
    return responseData;
  }
}

export function loader() {
  return defer({
    yearlySumData: loadYearlySummary(),
    monthlySumData: loadMonthlySummary(),
  });
}
