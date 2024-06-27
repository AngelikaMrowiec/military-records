import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import { YearlyRevenue } from "../../util/RevenueTypes";
import currency from "../../util/currencyFormat";
import TableWrapper from "../WrappingContainers/TableWrapper";

type Props = {
  yearlyRevenues: YearlyRevenue[];
};

const columnHelper = createColumnHelper<YearlyRevenue>();

const columns = [
  columnHelper.accessor("year", {
    header: () => "Data",
    cell: (info) => info.getValue(),
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

export default function YearlyRevenuesTable({ yearlyRevenues }: Props) {
  const data: YearlyRevenue[] = yearlyRevenues;
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return <TableWrapper title="Przychody roczne" table={table}/>
}
