import { useNavigate, useParams } from "react-router-dom";

import Button from "../widgets/Button";
import GridInput from "./GridInput";
import { useDecision } from "../lib/hooks/decision";

export default function Editor() {
  const { slug } = useParams();
  const [decision, setDecision, loadDecision] = useDecision(slug);
  const navigate = useNavigate();

  return (
    <div>
      <div className="text-3xl font-bold text-slate-800">editor</div>
      {decision && (
        <div>
          <div>{decision.name}</div>
          <GridInput decision={decision} setDecision={setDecision} />
        </div>
      )}
      {!decision && (
        <div>
          <div>oops! no decision found...</div>
          <Button
            className="mt-6 w-48 flex justify-center"
            text="explore archive"
            onClick={() => navigate("/archive")}
          />
        </div>
      )}
    </div>
  );
}
