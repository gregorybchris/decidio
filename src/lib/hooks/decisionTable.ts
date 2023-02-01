import Decision from "../models/decision";
import OptionRow from "../models/decisionRow";
import { range } from "../utilities/mathUtilities";

export function useDecisionTable(decision: Decision): OptionRow[] {
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
