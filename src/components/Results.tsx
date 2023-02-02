import Decision from "../lib/models/decision";
import { zeros } from "../lib/utilities/mathUtilities";

interface ResultsProps {
  decision: Decision;
}

export default function Results(props: ResultsProps) {
  const sums = zeros(props.decision.options.length);
  for (let i = 0; i < props.decision.options.length; i++) {
    for (let j = 0; j < props.decision.criteria.length; j++) {
      const weight = props.decision.weights[j];
      const score = props.decision.scores[j][i];
      sums[i] += weight * score;
    }
  }

  return (
    <div className="py-6">
      <div>
        <div className="text-2xl font-bold">results:</div>
        <div>
          {props.decision.options.map((option, i) => (
            <div key={i}>
              <span className="pl-4 font-bold">{option}: </span>
              <span>{sums[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
