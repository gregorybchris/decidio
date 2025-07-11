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

  const pairs = props.decision.options
    .map((option, i) => {
      return {
        option: option,
        score: sums[i],
      };
    })
    .sort((a, b) => b.score - a.score);

  return (
    <div className="py-6">
      <div>
        <div className="text-2xl font-bold">results:</div>
        <div>
          {pairs.map(({ option, score }) => (
            <div key={option}>
              <span className="pl-4 font-bold">{option}: </span>
              <span>{score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
