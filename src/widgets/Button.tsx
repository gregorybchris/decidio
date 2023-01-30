interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

export default function Button(props: ButtonProps) {
  function getClassName() {
    if (!props.className) return "";
    return props.className;
  }

  return (
    <div
      className={`flex justify-center w-full sm:w-48 px-3 py-2 rounded-md bg-slate-500 hover:bg-slate-600 cursor-pointer hover:text-slate-400 hover:ease-linear duration-150 ${getClassName()}`}
      onClick={() => props.onClick()}
    >
      <div className="font-bold text-slate-200">{props.text}</div>
    </div>
  );
}
