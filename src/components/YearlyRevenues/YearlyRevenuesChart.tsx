import { Line } from "react-chartjs-2";
import { YearlyRevenue } from "../../util/RevenueTypes";

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
      text: "Przychody roczne",
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
  yearlyRevenues: YearlyRevenue[];
};

export default function YearlyRevenues({ yearlyRevenues }: Props) {
  const data = {
    labels: yearlyRevenues.map((yearlyRevenue) => yearlyRevenue.year),
    datasets: [
      {
        label: "Military-Zone",
        data: yearlyRevenues.map((yearlyRevenue) => yearlyRevenue.militaryZone),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Sklepik Myśliwski",
        data: yearlyRevenues.map(
          (yearlyRevenue) => yearlyRevenue.sklepikMysliwski
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Allegro",
        data: yearlyRevenues.map((yearlyRevenue) => yearlyRevenue.allegro),
        borderColor: "#ff99c8",
        backgroundColor: "#ff99c8",
      },
      {
        label: "Sklep stacjonarny",
        data: yearlyRevenues.map((yearlyRevenue) => yearlyRevenue.stationary),
        borderColor: "#fcf6bd",
        backgroundColor: "#fcf6bd",
      },
      {
        label: "Inne",
        data: yearlyRevenues.map((yearlyRevenue) => yearlyRevenue.others),
        borderColor: "#C3ACCE",
        backgroundColor: "#C3ACCE",
      },
      {
        label: "OT",
        data: yearlyRevenues.map((yearlyRevenue) => yearlyRevenue.ot),
        borderColor: "#B3D89C",
        backgroundColor: "#B3D89C",
      },
      {
        label: "Suma",
        data: yearlyRevenues.map((yearlyRevenue) => yearlyRevenue.sum),
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
