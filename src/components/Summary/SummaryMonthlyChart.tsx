import { MonthlySummary } from "../../util/SummaryType";
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
      text: "Podsumowanie miesięczne",
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

const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

type Props = {
  monthlySumData: MonthlySummary[];
};

export default function SummaryMonthlyChart({ monthlySumData }: Props) {
  const labels = monthlySumData.map((monthlySum) =>
    new Date(monthlySum.yearMonth).toLocaleDateString(undefined, dateOptions)
  );

  const datasets = [
    {
      data: monthlySumData.map((monthlySum) => monthlySum.additional),
      label: "Niehandlowe",
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      data: monthlySumData.map((monthlySum) => monthlySum.commodities),
      label: "Handlowe",
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      data: monthlySumData.map((monthlySum) => monthlySum.difference),
      label: "Różnica",
      borderColor: "#ff99c8",
      backgroundColor: "#ff99c8",
    },
    {
      data: monthlySumData.map((monthlySum) => monthlySum.expenses),
      label: "Wydatki",
      borderColor: "#fcf6bd",
      backgroundColor: "#fcf6bd",
    },
    {
      data: monthlySumData.map((monthlySum) => monthlySum.income),
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
    <div className="relative m-auto w-[70vw]">
      <Line options={options} data={data} />
    </div>
  );
}
