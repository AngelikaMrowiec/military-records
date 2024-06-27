import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import { DailyRevenueDated } from "../../util/RevenueTypes";
import TableWrapper from "../WrappingContainers/TableWrapper";

type Props = {
  dailyRevenuesDated: DailyRevenueDated[];
};
const columnHelper = createColumnHelper<DailyRevenueDated>();

const columns = [
  columnHelper.accessor("day", {
    header: () => "Dzień",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("january", {
    header: () => "I",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("february", {
    header: () => "II",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("march", {
    header: () => "III",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("april", {
    header: () => "IV",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("may", {
    header: () => "V",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("june", {
    header: () => "VI",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("july", {
    header: () => "VII",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("august", {
    header: () => "VIII",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("september", {
    header: () => "IX",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("october", {
    header: () => "X",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("november", {
    header: () => "XI",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("december", {
    header: () => "XII",
    cell: (info) => info.getValue(),
  }),
];

export default function DailyRevenuesTable({ dailyRevenuesDated }: Props) {
  const data = dailyRevenuesDated;
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return <TableWrapper title="Przychody dzienne" table={table} />;
}
