import {
  ColumnDef,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Decision from "../lib/models/decision";
import { range } from "../lib/utilities/mathUtilities";

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
  const [data, setData] = useState(() => decisionToTable(props.decision));
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
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
    <div className="mt-6">
      <div className="py-6">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="border-y-2" key={headerGroup.id}>
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
      </div>
    </div>
  );
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

interface OptionRow {
  criterion: string;
  weight: number;
  [x: string | symbol]: unknown;
}

function decisionToTable(decision: Decision): OptionRow[] {
  return decision.criteria.map((criterion, i) => {
    const scores = decision.scores ? decision.scores[i] : range(decision.options.length).fill(0);
    let row: OptionRow = {
      criterion,
      weight: decision.weights ? decision.weights[i] : 0,
    };
    for (let i = 0; i < decision.options.length; i++) {
      row[decision.options[i]] = scores[i];
    }
    return row;
  });
}
