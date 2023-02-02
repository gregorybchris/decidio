import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../widgets/Button";
import Decision from "../lib/models/decision";
import EditorTable from "./EditorTable";
import { None } from "../lib/utilities/typingUtilities";
import Visualization from "./Visualization";
import { useDecision } from "../lib/hooks/decisionStorage";

export default function Editor() {
  const { slug } = useParams();
  const [decision, setDecision, loadDecision] = useDecision(slug);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (decision !== None) {
      setName(decision.name);
    }
  }, [decision]);

  function updateName(name: string, decision: Decision): void {
    setDecision({ ...decision, name });
  }

  return (
    <div>
      <div className="text-3xl font-bold text-slate-800">editor</div>

      {decision && (
        <div>
          <div className="px-1 py-1 outline-none">Name: {decision.name}</div>

          <input
            className="px-1 py-1 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => updateName(name, decision)}
          />

          <EditorTable decision={decision} setDecision={setDecision} />
          <Visualization />
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
