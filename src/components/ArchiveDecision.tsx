import Decision from "../lib/decision";

interface ArchiveDecisionProps {
  decision: Decision;
}

export default function ArchiveDecision(props: ArchiveDecisionProps) {
  const name = props.decision.name || "unnamed decision";
  return (
    <div className="w-64 px-3 py-2 mx-2 my-2 bg-slate-300 rounded-lg">
      <div className="flex justify-center font-bold">
        <div>{name}</div>
      </div>
    </div>
  );
}
