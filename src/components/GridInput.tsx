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
      <MyTable />;
      <div>
        <div>Options</div>
        <ul>
          {options.map((option, i) => (
            <li key={`option-${i}`}>{option}</li>
          ))}
        </ul>
      </div>
      <div>
        <div>Criteria</div>
        <ul>
          {criteria.map((criterion, i) => (
            <li key={`criterion-${i}`}>{criterion}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
