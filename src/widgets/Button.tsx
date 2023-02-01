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
      className={`flex w-full cursor-pointer justify-center rounded-md bg-gradient-to-tr from-slate-500 to-slate-700 px-3 py-2 duration-150 hover:from-slate-600 hover:to-slate-800 hover:text-slate-400 hover:ease-linear sm:w-48 ${getClassName()}`}
      onClick={() => props.onClick()}
    >
      <div className="font-bold text-slate-200">{props.text}</div>
    </div>
  );
}
