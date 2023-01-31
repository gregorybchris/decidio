import ItemsInput from "./ItemsInput";

interface OptionsInputProps {
  onNext: (options: string[]) => void;
  onSkip: () => void;
}

export default function OptionsInput(props: OptionsInputProps) {
  return (
    <div>
      <div className="text-3xl font-bold text-slate-800">what are our options?</div>
      <div className="mt-4">first let's list out the things we'll choose between</div>
      <ItemsInput itemType={["option", "options"]} onNext={props.onNext} />
      <div className="mt-3 inline-block" onClick={props.onSkip}>
        <div className="flex items-center hover:cursor-pointer">
          <div className="ml-2 text-slate-500 hover:text-slate-700">skip to editor</div>
        </div>
      </div>
    </div>
  );
}
