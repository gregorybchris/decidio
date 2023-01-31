import Decision from "../lib/models/decision";
import MyTable from "./MyTable";

interface GridInputProps {
  decision: Decision;
  setDecision: (decision: Decision) => void;
}

export default function GridInput(props: GridInputProps) {
  const options = props.decision.options;
  const criteria = props.decision.criteria;

  return (
    <div className="mt-6">
      <GridInputList name="Options" items={options} />
      <GridInputList name="Criteria" items={criteria} />
      <MyTable />
    </div>
  );
}

function GridInputList({ name, items }: { name: string; items: string[] }) {
  return (
    <div>
      <div className="font-bold">{name}</div>
      <div>
        {items.map((item, i) => (
          <div className="ml-4" key={`${name}-${i}`}>
            • {item}
          </div>
        ))}
      </div>
    </div>
  );
}
