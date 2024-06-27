import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import { MonthlyExpense } from "../../util/ExpenseTypes";
import currency from "../../util/currencyFormat";
import Modal from "../WrappingContainers/Modal";
import MonthlyExpenseEditForm from "./MonthlyExpenseEditForm";
import { useState } from "react";
import MonthlyExpenseDeleteForm from "./MonthlyExpenseDeleteForm";
import TableWrapper from "../WrappingContainers/TableWrapper";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

type Props = {
  monthlyExpenses: MonthlyExpense[];
};

const columnHelper = createColumnHelper<MonthlyExpense>();

const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function MonthlyExpensesTable({ monthlyExpenses }: Props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<MonthlyExpense | undefined>();

  function handleOpenEditModal(monthlyExpense: MonthlyExpense) {
    setShowEditModal((prevState) => !prevState);
    setSelectedRow(monthlyExpense);
  }

  function handleOpenDeleteModal(monthlyExpense: MonthlyExpense) {
    setShowDeleteModal((prevState) => !prevState);
    setSelectedRow(monthlyExpense);
  }

  const columns = [
    columnHelper.accessor("createDate", {
      header: () => "Data",
      cell: (info) =>
        new Date(info.getValue()).toLocaleDateString(undefined, dateOptions),
    }),
    columnHelper.accessor("category.name", {
      header: () => "Kategoria",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("value", {
      header: () => "Wartość",
      cell: (info) => currency(info.getValue()),
    }),
    columnHelper.accessor("category.id", {
      header: () => "Akcje",
      cell: ({ row }) => {
        return (
          <div className="flex justify-around">
            <button onClick={() => handleOpenEditModal(row.original)}>
              <AiFillEdit className="size-4" />
            </button>
            <button onClick={() => handleOpenDeleteModal(row.original)}>
              <AiFillDelete className="size-4" />
            </button>
          </div>
        );
      },
    }),
  ];

  const data: MonthlyExpense[] = monthlyExpenses;
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="flex flex-col m-auto w-[50%] h-full ">
        <TableWrapper title="Koszty miesięczne" table={table} />
      </div>
      <Modal open={showEditModal} onClose={() => setShowEditModal(false)}>
        {selectedRow ? (
          <MonthlyExpenseEditForm
            setShowEditModal={setShowEditModal}
            monthlyExpense={selectedRow}
          />
        ) : (
          <span>None selected</span>
        )}
      </Modal>
      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        {selectedRow ? (
          <MonthlyExpenseDeleteForm
            setShowDeleteModal={setShowDeleteModal}
            monthlyExpense={selectedRow}
          />
        ) : (
          <span>None selected</span>
        )}
      </Modal>
    </>
  );
}
