import DeleteIcon from "./DeleteIcon";
import { KeyboardEvent } from "react";

interface TextBoxProps {
  text: string;
  placeholder: string;
  onUpdate: (text: string) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  className?: string;
  inputClassName?: string;
  iconClass?: any;
}

export default function TextBox(props: TextBoxProps) {
  function onKeyDown(event: KeyboardEvent) {
    if (props.onKeyDown) {
      props?.onKeyDown(event);
    }
  }

  function getClassName() {
    return props.className || "";
  }

  function getInputClassName() {
    return props.inputClassName || "";
  }

  return (
    <div
      className={`w-full flex justify-between items-center sm:w-80 rounded-md bg-slate-300 hover:ease-linear duration-150 ${getClassName()}`}
    >
      {props.iconClass && <props.iconClass className="ml-3 text-neutral-600" />}
      <input
        className={`w-full bg-transparent px-3 py-2 outline-none placeholder-slate-400 text-slate-600 font-bold ${getInputClassName()}`}
        type="text"
        placeholder={props.placeholder}
        onChange={(event) => props.onUpdate(event.target.value)}
        onKeyDown={onKeyDown}
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
