import ItemsInput from "./ItemsInput";

interface CriteriaInputProps {
  onUpdateCriteria: (criteria: string[]) => void;
  onDone: () => void;
}

export default function CriteriaInput(props: CriteriaInputProps) {
  return (
    <div>
      <div className="text-3xl font-bold text-slate-800">what matters?</div>
      <div className="mt-4">now let's list out the important attributes of our options</div>
      <ItemsInput itemType="criterion" onUpdateItems={props.onUpdateCriteria} onDone={props.onDone} />
    </div>
  );
}
