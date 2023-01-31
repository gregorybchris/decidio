import {
  ColumnDef,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { OptionRow, makeData } from "../lib/mockData";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

// Ability to edit cells
const defaultColumn: Partial<ColumnDef<OptionRow>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);

    // Handle cell update
    function onBlur() {
      table.options.meta?.updateData(index, id, value);
      console.log("Editing (row, col, value)", index, id, value);
    }

    // If the initialValue is changed externally, sync it up with our state
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return <input value={value as string} onChange={(e) => setValue(e.target.value)} onBlur={onBlur} />;
  },
};

function useSkipper() {
  const shouldSkipRef = useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

export default function MyTable() {
  const columns = useMemo<ColumnDef<OptionRow>[]>(
    () => [
      {
        accessorKey: "option",
        header: () => "Option",
      },
      {
        accessorKey: "weight",
        header: () => "Weight",
      },
      {
        accessorKey: "scoreA",
        header: () => "Criterion 1",
      },
      {
        accessorKey: "scoreB",
        header: () => "Criterion 2",
      },
      {
        accessorKey: "scoreC",
        header: () => "Criterion 3",
      },
    ],
    []
  );

  const [data, setData] = useState(() => makeData(1000));

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip age index reset until after next rerender
        skipAutoResetPageIndex();
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    debugTable: true,
  });

  return (
    <div className="p-2">
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="text-left" key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className="border-b" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-2" />
    </div>
  );
}
