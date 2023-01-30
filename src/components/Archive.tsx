import ArchiveDecision from "./ArchiveDecision";
import Decision from "../lib/decision";

export default function Archive() {
  const decisions: Decision[] = [];
  // const decision = {
  //   name: "Job Plans",
  //   options: [],
  //   criteria: [],
  //   weights: [],
  //   scores: [],
  // };
  // const decisions: Decision[] = new Array(10).fill(decision);

  return (
    <div>
      <div className="text-3xl font-bold text-slate-800">archive</div>
      <div className="mt-6">
        {decisions.length > 0 && (
          <div className="flex flex-wrap">
            {decisions.map((decision) => (
              <ArchiveDecision decision={decision} />
            ))}
          </div>
        )}
        {decisions.length == 0 && <div>you have no existing decisions to review</div>}
      </div>
    </div>
  );
}
