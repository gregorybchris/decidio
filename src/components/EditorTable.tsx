import {
  ColumnDef,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

import AddIcon from "../widgets/AddIcon";
import Decision from "../lib/models/decision";
import OptionRow from "../lib/models/decisionRow";
import { useDecisionTable } from "../lib/hooks/decisionTable";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

interface EditorTableProps {
  decision: Decision;
  setDecision: (decision: Decision) => void;
}

export default function EditorTable(props: EditorTableProps) {
  const data = useDecisionTable(props.decision);
  const columns = useMemo<ColumnDef<OptionRow>[]>(
    () => [
      {
        accessorKey: "criterion",
        header: () => "criterion",
      },
      {
        accessorKey: "weight",
        header: () => "weight",
      },
      ...props.decision.options.map((option) => ({
        accessorKey: option,
      })),
    ],
    []
  );

  // Add ability to edit cells
  const defaultColumn: Partial<ColumnDef<OptionRow>> = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const initialValue = getValue();
      const [value, setValue] = useState(initialValue);

      useEffect(() => {
        console.log("Edited (row, col, value)", index, id, value);
      }, [value]);

      // Handle cell update
      function onBlur() {
        table.options.meta?.updateData(index, id, value);
        console.log("Updated (row, col, value)", index, id, value);
      }

      // If the initialValue is changed externally, sync it up with our state
      useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      return (
        <input
          className="w-full px-1 py-1 outline-none"
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      );
    },
  };

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        console.log("Updating data (row, col, value)", rowIndex, columnId, value);
        // TODO: Update decision, will trigger rerender, rerun useDecisionTable

        // setData((old) =>
        //   old.map((row, index) => {
        //     if (index === rowIndex) {
        //       return {
        //         ...old[rowIndex]!,
        //         [columnId]: value,
        //       };
        //     }
        //     return row;
        //   })
        // );
      },
    },
    debugTable: true,
  });

  return (
    <div className="mt-6">
      <div className="py-6">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="border-b-2" key={headerGroup.id}>
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
            <tr>
              <td
                className="inline-block px-1 py-1 text-slate-500 hover:cursor-pointer hover:text-slate-700"
                onClick={() => {
                  console.log("Adding new criterion");
                }}
              >
                <AddIcon />
                <div className="ml-2 inline-block">new</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
