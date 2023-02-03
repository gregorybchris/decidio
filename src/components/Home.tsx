import Button from "../widgets/Button";
import { useDecisions } from "../lib/hooks/decisionStorage";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [decisions, setDecisions, loadDecisions] = useDecisions();
  const navigate = useNavigate();

  return (
    <div>
      <div className="text-center text-5xl font-bold text-slate-800 sm:text-center">big decision to make?</div>
      <div className="mt-10 w-full text-center text-xl sm:text-center">
        decidio has you covered! just run through a few easy steps to make a hard choice easier
      </div>

      {decisions.length > 0 && (
        <div className="flex justify-center">
          <Button className="mt-10 mr-5" text="new decision" onClick={() => navigate("/new")} />
          <Button className="mt-10" text="my decisions" onClick={() => navigate("/library")} />
        </div>
      )}
      {decisions.length === 0 && (
        <div className="flex justify-center">
          <Button className="mt-10" text="let's go!" onClick={() => navigate("/new")} />
        </div>
      )}
    </div>
  );
}
