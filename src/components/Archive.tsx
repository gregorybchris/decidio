import Decision from "../lib/models/decision";
import DeleteIcon from "../widgets/DeleteIcon";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/dateUtilities";
import { useDecisions } from "../lib/hooks/decision";

export default function Archive() {
  const [decisions, setDecisions, loadDecisions] = useDecisions();

  function deleteDecision(slug: string) {
    setDecisions([...decisions.filter((d) => d.slug != slug)]);
  }

  return (
    <div>
      <div className="text-3xl font-bold text-slate-800">archive</div>
      <div className="mt-6">
        {decisions.length > 0 && (
          <div className="flex flex-wrap">
            {decisions.map((decision) => (
              <ArchiveDecision decision={decision} key={decision.id} onDelete={() => deleteDecision(decision.slug)} />
            ))}
          </div>
        )}
        {decisions.length == 0 && <div>you have no existing decisions to review</div>}
      </div>
    </div>
  );
}

interface ArchiveDecisionProps {
  decision: Decision;
  onDelete: () => void;
}

function ArchiveDecision(props: ArchiveDecisionProps) {
  const date = formatDate(props.decision.created);
  return (
    <div className="w-64 px-3 py-2 mx-2 my-2 bg-slate-300 rounded-lg">
      <div className="flex flex-col items-center">
        <div className="flex justify-center">
          <Link to={`/editor/${props.decision.slug}`}>
            <div className="font-bold hover:cursor-pointer text-slate-700 hover:text-slate-500 hover:ease-linear duration-150">
              {props.decision.name}
            </div>
          </Link>
          <div className="ml-3" onClick={props.onDelete}>
            <DeleteIcon />
          </div>
        </div>
        <div>{date}</div>
      </div>
    </div>
  );
}
