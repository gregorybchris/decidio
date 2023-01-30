import ItemsInput from "./ItemsInput";

interface OptionsInputProps {
  onUpdateOptions: (options: string[]) => void;
  onDone: () => void;
}

export default function OptionsInput(props: OptionsInputProps) {
  return (
    <div>
      <div className="text-3xl font-bold text-slate-800">what are our options?</div>
      <div className="mt-4">first let's list out the things we'll choose between</div>
      <ItemsInput itemType="option" onUpdateItems={props.onUpdateOptions} onDone={props.onDone} />
    </div>
  );
}
