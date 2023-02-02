import {
  Column,
  ColumnDef,
  Getter,
  Row,
  RowData,
  Table,
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

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnName: string, value: string) => void;
  }
}

interface EditorTableProps {
  decision: Decision;
  setDecision: (decision: Decision) => void;
}

export default function EditorTable(props: EditorTableProps) {
  const data = decisionToTable(props.decision);
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
  const defaultColumn: Partial<ColumnDef<OptionRow>> = {
    cell: TableCell,
  };

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {
      updateData: onUpdateData,
    },
    debugTable: true,
  });

  function decisionToTable(decision: Decision): OptionRow[] {
    return decision.criteria.map((criterion, i) => {
      let row: OptionRow = {
        criterion,
        weight: decision.weights[i],
      };
      for (let j = 0; j < decision.options.length; j++) {
        row[decision.options[j]] = decision.scores[i][j];
      }
      return row;
    });
  }

  function onUpdateData(rowIndex: number, columnName: string, value: string) {
    const colIndex = props.decision.options.findIndex((o) => o == columnName) + 2;

    let newDecision: Decision = {
      ...props.decision,
    };

    if (columnName === "criterion") {
      newDecision.criteria = props.decision.criteria.map((criterion, i) => (i == rowIndex ? value : criterion));
    } else if (columnName === "weight") {
      newDecision.weights = props.decision.weights.map((weight, i) => (i == rowIndex ? parseInt(value) : weight));
    } else {
      const scoreColIndex = colIndex - 2;
      newDecision.scores = props.decision.scores.map((scoresRow, i) =>
        scoresRow.map((score, j) => (i == rowIndex && j == scoreColIndex ? parseInt(value) : score))
      );
    }

    props.setDecision(newDecision);
  }

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
                  let newDecision: Decision = {
                    ...props.decision,
                    criteria: [...props.decision.criteria, "unnamed"],
                  };
                  props.setDecision(newDecision);
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

interface TableCellProps {
  getValue: Getter<string>;
  row: Row<OptionRow>;
  column: Column<OptionRow, unknown>;
  table: Table<OptionRow>;
}

function TableCell(props: TableCellProps) {
  const initialValue = props.getValue();
  const [value, setValue] = useState(initialValue);

  function onBlur() {
    props.table.options.meta?.updateData(props.row.index, props.column.id, value);
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
}
