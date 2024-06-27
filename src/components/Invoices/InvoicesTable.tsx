import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import { Invoice, PaymentType, InvoiceType } from "../../util/InvoiceType";
import { useState } from "react";
import Modal from "../WrappingContainers/Modal";
import TableWrapper from "../WrappingContainers/TableWrapper";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FaCoins } from "react-icons/fa";
import currencyFormat from "../../util/currencyFormat";
import InvoiceEditForm from "./InvoiceEditForm";
import InvoiceDeleteForm from "./InvoiceDeleteForm";
import InvoicePayForm from "./InvoicePayForm";

type Props = {
  invoices: Invoice[];
};

const columnHelper = createColumnHelper<Invoice>();

const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

export default function Invoices({ invoices }: Props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Invoice | undefined>();

  function handleOpenEditModal(invoice: Invoice) {
    setShowEditModal((prevState) => !prevState);
    setSelectedRow(invoice);
  }

  function handleOpenDeleteModal(invoice: Invoice) {
    setShowDeleteModal((prevState) => !prevState);
    setSelectedRow(invoice);
  }

  function handleOpenPayModal(invoice: Invoice) {
    setShowPayModal((prevState) => !prevState);
    setSelectedRow(invoice);
  }

  const columns = [
    columnHelper.accessor("createdAt", {
      header: () => "Data utworzenia",
      cell: (info) =>
        new Date(info.getValue()).toLocaleDateString(undefined, dateOptions),
    }),
    columnHelper.accessor("invoiceType", {
      header: () => "Rodzaj faktury",
      cell: (info) => InvoiceType[info.getValue()],
    }),
    columnHelper.accessor("company.name", {
      header: () => "Firma",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("paymentType", {
      header: () => "Rodzaj płatności",
      cell: (info) => PaymentType[info.getValue()],
    }),
    columnHelper.accessor("invoiceNumber", {
      header: () => "Numer faktury",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("bruttoValue", {
      header: () => "Brutto",
      cell: (info) => currencyFormat(info.getValue()),
    }),
    columnHelper.accessor("vatValue", {
      header: () => "Vat",
      cell: (info) => currencyFormat(info.getValue()),
    }),
    columnHelper.accessor("paymentDeadlineDate", {
      header: () => "Termin",
      cell: (info) =>
        new Date(info.getValue()).toLocaleDateString(undefined, dateOptions),
    }),
    columnHelper.accessor("id", {
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
            <button
              onClick={() => handleOpenPayModal(row.original)}
              disabled={row.original.isPaid}
            >
              {row.original.isPaid ? (
                <FaCoins className="size-4" color="green" />
              ) : (
                <FaCoins className="size-4" />
              )}
            </button>
          </div>
        );
      },
    }),
  ];

  const data: Invoice[] = invoices;
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <TableWrapper title="Faktury" table={table} />
      <Modal open={showEditModal} onClose={() => setShowEditModal(false)}>
        {selectedRow ? (
          <InvoiceEditForm
            setShowEditModal={setShowEditModal}
            invoice={selectedRow}
          />
        ) : (
          <span>None selected</span>
        )}
      </Modal>
      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        {selectedRow ? (
          <InvoiceDeleteForm
            setShowDeleteModal={setShowDeleteModal}
            invoice={selectedRow}
          />
        ) : (
          <span>None selected</span>
        )}
      </Modal>
      <Modal open={showPayModal} onClose={() => setShowPayModal(false)}>
        {selectedRow ? (
          <InvoicePayForm
            setShowPayModal={setShowPayModal}
            invoice={selectedRow}
          />
        ) : (
          <span>None selected</span>
        )}
      </Modal>
    </>
  );
}
