import { Line } from "react-chartjs-2";
import { MonthlyRevenue } from "../../util/RevenueTypes";

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
      text: "Przychody miesięczne",
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
  monthlyRevenues: MonthlyRevenue[];
};

export default function MonthlyRevenuesChart({ monthlyRevenues }: Props) {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };

  const data = {
    labels: monthlyRevenues.map((monthlyRevenue) =>
      new Date(monthlyRevenue.yearMonth).toLocaleDateString(
        undefined,
        dateOptions
      )
    ),
    datasets: [
      {
        label: "Military-Zone",
        data: monthlyRevenues.map(
          (monthlyRevenue) => monthlyRevenue.militaryZone
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Sklepik Myśliwski",
        data: monthlyRevenues.map(
          (monthlyRevenue) => monthlyRevenue.sklepikMysliwski
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Allegro",
        data: monthlyRevenues.map((monthlyRevenue) => monthlyRevenue.allegro),
        borderColor: "#ff99c8",
        backgroundColor: "#ff99c8",
      },
      {
        label: "Sklep stacjonarny",
        data: monthlyRevenues.map(
          (monthlyRevenue) => monthlyRevenue.stationary
        ),
        borderColor: "#fcf6bd",
        backgroundColor: "#fcf6bd",
      },
      {
        label: "Inne",
        data: monthlyRevenues.map((monthlyRevenue) => monthlyRevenue.others),
        borderColor: "#C3ACCE",
        backgroundColor: "#C3ACCE",
      },
      {
        label: "OT",
        data: monthlyRevenues.map((monthlyRevenue) => monthlyRevenue.ot),
        borderColor: "#B3D89C",
        backgroundColor: "#B3D89C",
      },
      {
        label: "Suma",
        data: monthlyRevenues.map((monthlyRevenue) => monthlyRevenue.sum),
        borderColor: "#FF9671",
        backgroundColor: "#FF9671",
      },
    ],
  };

  return (
    <div className="relative  m-auto w-[70vw]">
      <Line options={options} data={data} />
    </div>
  );
}
