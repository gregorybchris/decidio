import NewItems from "./NewItems";

interface NewOptionsProps {
  onNext: (options: string[]) => void;
  onSkip: () => void;
}

export default function NewOptions(props: NewOptionsProps) {
  return (
    <div>
      <div className="text-3xl font-bold text-slate-800">what are our options?</div>
      <div className="mt-4">first let's list out the things we'll choose between</div>
      <NewItems itemType={["option", "options"]} onNext={props.onNext} />
    </div>
  );
}
