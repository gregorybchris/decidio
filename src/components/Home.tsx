import Button from "../widgets/Button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="text-5xl font-bold text-slate-800">big decision to make?</div>
      <div className="mt-6">
        decidio has you covered! just run through a few easy steps to make a hard choice easier
      </div>
      <Button className="mt-6 flex w-48 justify-center" text="let's go!" onClick={() => navigate("/new")} />
    </div>
  );
}
