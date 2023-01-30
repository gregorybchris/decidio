import ItemsInput from "./ItemsInput";

interface OptionsInputProps {
  onUpdateOptions: (options: string[]) => void;
  onDone: () => void;
  onSkip: () => void;
}

export default function OptionsInput(props: OptionsInputProps) {
  return (
    <div>
      <div className="text-3xl font-bold text-slate-800">what are our options?</div>
      <div className="mt-4">first let's list out the things we'll choose between</div>
      <ItemsInput itemType="option" onUpdateItems={props.onUpdateOptions} onDone={props.onDone} />
      <div className="mt-3 inline-block" onClick={props.onSkip}>
        <div className="flex items-center hover:cursor-pointer">
          <div className="ml-2 text-slate-500 hover:text-slate-700">skip ahead</div>
        </div>
      </div>
    </div>
  );
}
