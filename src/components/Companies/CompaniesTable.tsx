import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { Company } from "../../util/CompanyType";
import TableWrapper from "../WrappingContainers/TableWrapper";
import Modal from "../WrappingContainers/Modal";
import CompanyEditForm from "./CompanyEditForm";
import { AiFillEdit } from "react-icons/ai";

type Props = {
  companies: Company[];
};

const columnHelper = createColumnHelper<Company>();

export default function CompaniesTable({ companies }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Company | undefined>();

  useEffect(() => {
    document.body.addEventListener("click", () => {
      setShowModal(false);
    });
  });

  function handleButtonAction(companies: Company) {
    setShowModal((prevState) => !prevState);
    setSelectedRow(companies);
  }

  const columns = [
    columnHelper.accessor("name", {
      header: () => "Firma",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("bankAccountNumber", {
      header: () => "Numer konta",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("id", {
      header: () => "Akcje",
      cell: ({ row }) => {
        return (
          <div className="flex justify-around h-[5%]" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => handleButtonAction(row.original)}>
              <AiFillEdit className="size-4" />
            </button>
          </div>
        );
      },
    }),
  ];

  const data: Company[] = companies;
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="flex flex-col items-center m-auto w-[50%] h-full ">
        <TableWrapper title="Firmy" table={table} />
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        {selectedRow ? (
          <CompanyEditForm companies={selectedRow} setShowModal={setShowModal}/>
        ) : (
          <span>None selected</span>
        )}
      </Modal>
    </>
  );
}
