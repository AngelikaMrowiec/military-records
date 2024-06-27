import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import { Refund } from "../../util/RefundType";
import TableWrapper from "../WrappingContainers/TableWrapper";
import currency from "../../util/currencyFormat";
import { useState } from "react";
import { HiReceiptRefund } from "react-icons/hi2";
import RefundForm from "./RefundForm";
import RefundDeleteForm from "./RefundDeleteForm";
import Modal from "../WrappingContainers/Modal";
import { AiFillDelete } from "react-icons/ai";

type Props = {
  refunds: Refund[];
};

const columnHelper = createColumnHelper<Refund>();

const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

export default function RefundsTable({ refunds }: Props) {
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Refund | undefined>();

  function handleOpenRefundModal(refund: Refund) {
    setShowRefundModal((prevState) => !prevState);
    setSelectedRow(refund);
  }

  function handleOpenDeleteModal(refund: Refund) {
    setShowDeleteModal((prevState) => !prevState);
    setSelectedRow(refund);
  }

  const columns = [
    columnHelper.accessor("createdDate", {
      header: () => "Data utworzenia zwrotu",
      cell: (info) =>
        new Date(info.getValue()).toLocaleDateString(undefined, dateOptions),
    }),
    columnHelper.accessor("refundedDate", {
      header: () => "Data zwrotu",
      cell: (info) =>
        new Date(info.getValue()).toLocaleDateString(undefined, dateOptions),
    }),
    columnHelper.accessor("firstName", {
      header: () => "Imię",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("lastName", {
      header: () => "Nazwisko",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("value", {
      header: () => "Wartość",
      cell: (info) => currency(info.getValue()),
    }),
    columnHelper.accessor("orderNumber", {
      header: () => "Numer zamówienia",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: () => "Opis",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("id", {
      header: () => "Akcje",
      cell: ({ row }) => {
        return (
          <div className="flex justify-around">
            <button onClick={() => handleOpenDeleteModal(row.original)}>
              <AiFillDelete className="size-4" />
            </button>
            <button
              onClick={() => handleOpenRefundModal(row.original)}
              disabled={row.original.isRefunded}
            >
              {row.original.isRefunded ? (
                <HiReceiptRefund className="size-4" color="green" />
              ) : (
                <HiReceiptRefund className="size-4" />
              )}
            </button>
          </div>
        );
      },
    }),
  ];

  const data: Refund[] = refunds;
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <TableWrapper title="Zwroty" table={table} />
      <Modal open={showRefundModal} onClose={() => setShowRefundModal(false)}>
        {selectedRow ? (
          <RefundForm
            setShowRefundModal={setShowRefundModal}
            refund={selectedRow}
          />
        ) : (
          <span>None selected</span>
        )}
      </Modal>
      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        {selectedRow ? (
          <RefundDeleteForm
            setShowDeleteModal={setShowDeleteModal}
            refund={selectedRow}
          />
        ) : (
          <span>None selected</span>
        )}
      </Modal>
    </>
  );
}
