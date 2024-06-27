import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import { MonthlyRevenue } from "../../util/RevenueTypes";
import currency from "../../util/currencyFormat";
import TableWrapper from "../WrappingContainers/TableWrapper";

type Props = {
  monthlyRevenues: MonthlyRevenue[];
};

const columnHelper = createColumnHelper<MonthlyRevenue>();

const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
};

const columns = [
  columnHelper.accessor("yearMonth", {
    header: () => "Data",
    cell: (info) =>
      new Date(info.getValue()).toLocaleDateString(undefined, dateOptions),
  }),
  columnHelper.accessor("militaryZone", {
    header: () => "Military-Zone",
    cell: (info) => currency(info.getValue()),
  }),
  columnHelper.accessor("sklepikMysliwski", {
    header: () => "Sklepik Myśliwski",
    cell: (info) => currency(info.getValue()),
  }),
  columnHelper.accessor("allegro", {
    header: () => "Allegro",
    cell: (info) => currency(info.getValue()),
  }),
  columnHelper.accessor("stationary", {
    header: () => "Sklep stacjonarny",
    cell: (info) => currency(info.getValue()),
  }),
  columnHelper.accessor("others", {
    header: () => "Inne",
    cell: (info) => currency(info.getValue()),
  }),
  columnHelper.accessor("ot", {
    header: () => "OT",
    cell: (info) => currency(info.getValue()),
  }),
  columnHelper.accessor("sum", {
    header: () => "Suma",
    cell: (info) => currency(info.getValue()),
  }),
];

export default function MonthlyRevenuesTable({ monthlyRevenues }: Props) {
  const data: MonthlyRevenue[] = monthlyRevenues;
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return <TableWrapper title="Przychody miesięczne" table={table} />;
}
