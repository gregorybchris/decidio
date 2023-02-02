import Decision from "../lib/models/decision";
import DeleteIcon from "../widgets/DeleteIcon";
import { Link } from "react-router-dom";
import { accPred } from "../lib/utilities/sortUtilities";
import { formatDate } from "../lib/utilities/dateUtilities";
import { useDecisions } from "../lib/hooks/decisionStorage";

export default function Library() {
  const [decisions, setDecisions, loadDecisions] = useDecisions();

  function deleteDecision(slug: string) {
    setDecisions([...decisions.filter((d) => d.slug != slug)]);
  }

  return (
    <div>
      <div className="text-3xl font-bold text-slate-800">library</div>
      <div className="mt-6">
        {decisions.length > 0 && (
          <div className="flex flex-wrap">
            {decisions.sort(accPred((d) => d.created)).map((d) => (
              <LibraryDecision decision={d} key={d.id} onDelete={() => deleteDecision(d.slug)} />
            ))}
          </div>
        )}
        {decisions.length == 0 && <div>you have no existing decisions to review</div>}
      </div>
    </div>
  );
}

interface LibraryDecisionProps {
  decision: Decision;
  onDelete: () => void;
}

function LibraryDecision(props: LibraryDecisionProps) {
  const date = formatDate(props.decision.created);
  return (
    <div className="mx-2 my-2 w-full rounded-lg bg-slate-300 px-3 py-2 sm:w-64">
      <div className="flex flex-col items-center">
        <Link className="w-full truncate text-center" to={`/editor/${props.decision.slug}`}>
          <div className="font-bold text-slate-700 duration-150 hover:cursor-pointer hover:text-slate-500 hover:ease-linear">
            {props.decision.name}
          </div>
        </Link>
        <div className="flex w-full justify-between">
          <div>{date}</div>
          <div className="ml-3" onClick={props.onDelete}>
            <DeleteIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
