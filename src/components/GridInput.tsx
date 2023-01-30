// import { useReactTable } from "@tanstack/react-table";

import MyTable from "./MyTable";

interface GridInputProps {
  options: string[];
  setOptions: (options: string[]) => void;
  criteria: string[];
  setCriteria: (criteria: string[]) => void;
}
export default function GridInput(props: GridInputProps) {
  // const table = useReactTable();

  return (
    <div>
      <MyTable />;
      <div>
        <div>Options</div>
        <ul>
          {props.options.map((option) => (
            <li>{option}</li>
          ))}
        </ul>
      </div>
      <div>
        <div>Criteria</div>
        <ul>
          {props.criteria.map((criterion) => (
            <li>{criterion}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
