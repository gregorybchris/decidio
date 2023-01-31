import NewItems from "./NewItems";

interface NewCriteriaProps {
  onNext: (criteria: string[]) => void;
  onSkip: () => void;
}

export default function NewCriteria(props: NewCriteriaProps) {
  return (
    <div>
      <div className="text-3xl font-bold text-slate-800">what matters?</div>
      <div className="mt-4">now let's list out the important attributes of our options</div>
      <NewItems itemType={["criterion", "criteria"]} onNext={props.onNext} />
      <div className="mt-3 inline-block" onClick={props.onSkip}>
        <div className="flex items-center hover:cursor-pointer">
          <div className="ml-2 text-slate-500 hover:text-slate-700">skip to editor</div>
        </div>
      </div>
    </div>
  );
}
