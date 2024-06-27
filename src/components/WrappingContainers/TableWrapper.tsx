import { Table, flexRender } from "@tanstack/react-table";

type Props<TData> = {
  table: Table<TData>;
  title: string;
};

export default function TableWrapper<TData>({ table, title }: Props<TData>) {
  return (
    <>
      <h1 className="text-center text-xl font-semibold mb-4">{title}</h1>
      <div className="h-[90%] m-0 flex justify-center items-center">
        <div className="h-full w-full overflow-auto rounded-md bg-white shadow-lg">
          <table className="table-fixed w-full">
            <thead className="sticky top-0 z-5 bg-sage-300">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-gray-300">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="py-2 px-4 border-r border-gray-300 text-center text-balance text-md font-medium text-white"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-sage-400 even:bg-gray-100">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="py-2 px-4 text-center text-balance border border-gray-300 text-sm text-gray-800"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
