export interface DisplayData {
  text: string;
  status: "ok" | "error";
}

export function defaultDisplayData(): DisplayData {
  return {
    text: "",
    status: "ok",
  };
}

interface DisplayProps {
  className?: string;
  data: DisplayData;
}

export default function Display(props: DisplayProps) {
  const color = props.data.status === "error" ? "text-rose-700" : "text-slate-400";
  const style = `font-bold ${color}`;
  return <div className={`${style} ${props.className}`}>{props.data.text}</div>;
}

Display.defaultProps = { error: false };
