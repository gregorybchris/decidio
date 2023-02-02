import { useNavigate, useParams } from "react-router-dom";

import Button from "../widgets/Button";
import Decision from "../lib/models/decision";
import EditorTable from "./EditorTable";
import Results from "./Results";
import { useDecision } from "../lib/hooks/decisionStorage";

export default function Editor() {
  const { slug } = useParams();
  const [decision, setDecision, loadDecision] = useDecision(slug);
  const navigate = useNavigate();

  function updateName(name: string, decision: Decision): void {
    setDecision({ ...decision, name });
  }

  return (
    <div>
      <div className="text-3xl font-bold text-slate-800">editor</div>

      {decision && (
        <div>
          <input
            type="text"
            className="px-2 py-1 outline-none"
            value={decision.name}
            maxLength={20}
            onChange={(e) => updateName(e.target.value, decision)}
          />

          <EditorTable decision={decision} setDecision={setDecision} />
          <Results decision={decision} />
        </div>
      )}

      {!decision && (
        <div>
          <div>oops! no decision found...</div>
          <Button
            className="mt-6 flex w-48 justify-center"
            text="explore archive"
            onClick={() => navigate("/archive")}
          />
        </div>
      )}
    </div>
  );
}
