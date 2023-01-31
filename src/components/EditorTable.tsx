import Decision from "../lib/models/decision";
import MyTable from "./MyTable";

interface EditorTableProps {
  decision: Decision;
  setDecision: (decision: Decision) => void;
}

export default function EditorTable(props: EditorTableProps) {
  const options = props.decision.options;
  const criteria = props.decision.criteria;

  return (
    <div className="mt-6">
      <EditorTableList name="Options" items={options} />
      <EditorTableList name="Criteria" items={criteria} />
      <MyTable />
      <div>
        <div>visualization: </div>
      </div>
    </div>
  );
}

function EditorTableList({ name, items }: { name: string; items: string[] }) {
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
