import { Line } from "react-chartjs-2";
import { MonthlyExpense } from "../../util/ExpenseTypes";

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
      text: "Koszty miesięczne",
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
  monthlyExpenses: MonthlyExpense[];
};

export default function MonthlyExpensesChart({ monthlyExpenses }: Props) {
  const expenses = monthlyExpenses.map((monthlyExpense) => {
    return {
      ...monthlyExpense,
      createDate: new Date(monthlyExpense.createDate),
    };
  });

  const dates = expenses
    .map((monthlyExpense) => monthlyExpense.createDate)
    .sort((a, b) => a.getTime() - b.getTime());

  const uniqueDates = [...new Set(dates)];

  const categories = [
    ...new Map(
      expenses.map((expense) => [expense.category.id, expense.category])
    ).values(),
  ];

  const dataSets = categories.map((category) => {
    const expensesWithCategory = expenses.filter(
      (expense) => expense.category.id === category.id
    );

    const data = uniqueDates.map((date) => {
      let expensesWithCorrectDate = expensesWithCategory.filter(
        (expense) => expense.createDate === date
      );

      if (expensesWithCorrectDate.length <= 0) return 0;

      let value = 0;

      for (let index = 0; index < expensesWithCorrectDate.length; index++) {
        const element = expensesWithCorrectDate[index];
        value += element.value;
      }

      return value;
    });

    return {
      data: data,
      label: category.name,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    };
  });

  const data = {
    labels: uniqueDates.map((date) =>
      date.toLocaleDateString(undefined, dateOptions)
    ),
    datasets: dataSets,
  };

  return (
    <div className="relative  m-auto w-[70vw]">
      <Line options={options} data={data} />
    </div>
  );
}
