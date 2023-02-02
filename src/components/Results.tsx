import Decision from "../lib/models/decision";

interface ResultsProps {
  decision: Decision;
}

export default function Results(props: ResultsProps) {
  return (
    <div>
      <div>results: </div>
    </div>
  );
}
