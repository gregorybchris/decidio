import ItemsInput from "./ItemsInput";

interface CriteriaInputProps {
  onUpdateCriteria: (criteria: string[]) => void;
  onDone: () => void;
  onSkip: () => void;
}

export default function CriteriaInput(props: CriteriaInputProps) {
  return (
    <div>
      <div className="text-3xl font-bold text-slate-800">what matters?</div>
      <div className="mt-4">now let's list out the important attributes of our options</div>
      <ItemsInput itemType="criterion" onUpdateItems={props.onUpdateCriteria} onDone={props.onDone} />
      <div className="mt-3 inline-block" onClick={props.onSkip}>
        <div className="flex items-center hover:cursor-pointer">
          <div className="ml-2 text-slate-500 hover:text-slate-600">skip ahead</div>
        </div>
      </div>
    </div>
  );
}
