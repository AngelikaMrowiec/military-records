import { useState } from "react";
import { DailyRevenue } from "../../util/RevenueTypes";
import { DailyRevenueDated } from "../../util/RevenueTypes";
import SwitchSelector from "../../react-switch-selector/SwitchSelector";
import DailyRevenuesTable from "../DailyRevenues/DailyRevenuesTable";

type Props = {
  dailyRevenues: DailyRevenue[];
};

export default function DailyRevenuesTabels({ dailyRevenues }: Props) {
  const dates = dailyRevenues.map((dailyRevenue) =>
    new Date(dailyRevenue.date).getFullYear()
  );
  const uniqueDates = [...new Set(dates)].sort((a, b) => b - a);
  const [selectedYear, setSelectedYear] = useState(uniqueDates[0]);

  const filtratedDailyRevenues = dailyRevenues.filter(
    (dailyRevenue) => new Date(dailyRevenue.date).getFullYear() === selectedYear
  );
  console.log(filtratedDailyRevenues);
  let filtratedTable: DailyRevenueDated[] = [];

  for (let i = 1; i <= 31; i++) {
    const tableRow: DailyRevenueDated = {
      day: i,
      january: filtratedDailyRevenues.filter(
        (dailyRevenue) =>
          new Date(dailyRevenue.date).getDate() === i &&
          new Date(dailyRevenue.date).getMonth() === 0
      )[0]?.value,
      february: filtratedDailyRevenues.filter(
        (dailyRevenue) =>
          new Date(dailyRevenue.date).getDate() === i &&
          new Date(dailyRevenue.date).getMonth() === 1
      )[0]?.value,
      march: filtratedDailyRevenues.filter(
        (dailyRevenue) =>
          new Date(dailyRevenue.date).getDate() === i &&
          new Date(dailyRevenue.date).getMonth() === 2
      )[0]?.value,
      april: filtratedDailyRevenues.filter(
        (dailyRevenue) =>
          new Date(dailyRevenue.date).getDate() === i &&
          new Date(dailyRevenue.date).getMonth() === 3
      )[0]?.value,
      may: filtratedDailyRevenues.filter(
        (dailyRevenue) =>
          new Date(dailyRevenue.date).getDate() === i &&
          new Date(dailyRevenue.date).getMonth() === 4
      )[0]?.value,
      june: filtratedDailyRevenues.filter(
        (dailyRevenue) =>
          new Date(dailyRevenue.date).getDate() === i &&
          new Date(dailyRevenue.date).getMonth() === 5
      )[0]?.value,
      july: filtratedDailyRevenues.filter(
        (dailyRevenue) =>
          new Date(dailyRevenue.date).getDate() === i &&
          new Date(dailyRevenue.date).getMonth() === 6
      )[0]?.value,
      august: filtratedDailyRevenues.filter(
        (dailyRevenue) =>
          new Date(dailyRevenue.date).getDate() === i &&
          new Date(dailyRevenue.date).getMonth() === 7
      )[0]?.value,
      september: filtratedDailyRevenues.filter(
        (dailyRevenue) =>
          new Date(dailyRevenue.date).getDate() === i &&
          new Date(dailyRevenue.date).getMonth() === 8
      )[0]?.value,
      october: filtratedDailyRevenues.filter(
        (dailyRevenue) =>
          new Date(dailyRevenue.date).getDate() === i &&
          new Date(dailyRevenue.date).getMonth() === 9
      )[0]?.value,
      november: filtratedDailyRevenues.filter(
        (dailyRevenue) =>
          new Date(dailyRevenue.date).getDate() === i &&
          new Date(dailyRevenue.date).getMonth() === 10
      )[0]?.value,
      december: filtratedDailyRevenues.filter(
        (dailyRevenue) =>
          new Date(dailyRevenue.date).getDate() === i &&
          new Date(dailyRevenue.date).getMonth() === 11
      )[0]?.value,
    };
    filtratedTable = [...filtratedTable, tableRow];
  }
  const options = uniqueDates.map((uniqueDate) => ({
    label: uniqueDate,
    value: uniqueDate,
    selectedBackgroundColor: uniqueDate % 2 === 1 ? "#64724c" : "#859865",
  }));

  const onChange = (newValue: any) => {
    setSelectedYear(newValue);
  };

  return (
    <div className="flex flex-col items-center m-auto h-full">
      <div className="h-[10%] w-[65%] mb-6">
        <SwitchSelector
          onChange={onChange}
          options={options}
          initialSelectedIndex={0}
          backgroundColor={"#545853"}
          fontColor={"#FFFFFF"}
        />
      </div>
      <DailyRevenuesTable dailyRevenuesDated={filtratedTable} />
    </div>
  );
}
