import DeleteIcon from "./DeleteIcon";

interface TextBoxProps {
  text: string;
  placeholder: string;
  onUpdate: (text: string) => void;
  className?: string;
  inputClassName?: string;
  iconClass?: any;
}

export default function TextBox(props: TextBoxProps) {
  function getClassName() {
    return props.className || "";
  }

  function getInputClassName() {
    return props.inputClassName || "";
  }

  return (
    <div
      className={`flex w-full items-center justify-between rounded-md bg-slate-300 duration-150 hover:ease-linear sm:w-80 ${getClassName()}`}
    >
      {props.iconClass && <props.iconClass className="ml-3 text-neutral-600" />}
      <input
        className={`w-full bg-transparent px-3 py-2 font-bold text-slate-600 placeholder-slate-400 outline-none ${getInputClassName()}`}
        type="text"
        placeholder={props.placeholder}
        onChange={(event) => props.onUpdate(event.target.value)}
        value={props.text}
      />
      {props.text && (
        <div className="mr-3" onClick={() => props.onUpdate("")}>
          <DeleteIcon />
        </div>
      )}
    </div>
  );
}
