import { YearlySummary } from "../../util/SummaryType";
import { Line } from "react-chartjs-2";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        font: {
          size: 14,
        },
        color: "#FFFFFF",
        padding: 15,
      },
    },
    title: {
      display: true,
      text: "Podsumowanie roczne",
      padding: {
        bottom: 30,
      },
      color: "#FFFFFF",
      font: {
        size: 20,
        line: 28,
        weight: 600,
      },
    },
  },
  scales: {
    y: {
      ticks: {
        color: "#FFFFFF",
      },
    },
    x: {
      ticks: {
        color: "#FFFFFF",
      },
    },
  },
};

type Props = {
  yearlySumData: YearlySummary[];
};

export default function SummaryYearlyChart({ yearlySumData }: Props) {
  const labels = yearlySumData.map((yearlySum) => yearlySum.year);

  const datasets = [
    {
      data: yearlySumData.map((yearlySum) => yearlySum.additional),
      label: "Niehandlowe",
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      data: yearlySumData.map((yearlySum) => yearlySum.commodities),
      label: "Handlowe",
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      data: yearlySumData.map((yearlySum) => yearlySum.difference),
      label: "Różnica",
      borderColor: "#ff99c8",
      backgroundColor: "#ff99c8",
    },
    {
      data: yearlySumData.map((yearlySum) => yearlySum.expenses),
      label: "Wydatki",
      borderColor: "#fcf6bd",
      backgroundColor: "#fcf6bd",
    },
    {
      data: yearlySumData.map((yearlySum) => yearlySum.income),
      label: "Przychód",
      borderColor: "#C3ACCE",
      backgroundColor: "#C3ACCE",
    },
  ];

  const data = {
    labels,
    datasets,
  };
  return (
    <div className="relative  m-auto w-[70vw]">
      <Line options={options} data={data} />
    </div>
  );
}
