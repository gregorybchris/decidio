import { useRef, useState } from "react";

import CriteriaInput from "./CriteriaInput";
import GridInput from "./GridInput";
import OptionsInput from "./OptionsInput";
import StateMachine from "../lib/stateMachine";

export default function Decide() {
  const [options, setOptions] = useState<string[]>([""]);
  const [criteria, setCriteria] = useState<string[]>([""]);
  const stateMachine = useRef(
    new StateMachine("options")
      .addState("criteria")
      .addState("grid")
      .addTransition("options", "criteria")
      .addTransition("criteria", "grid")
  );

  return (
    <div>
      {stateMachine.current.isCurrent("options") && (
        <OptionsInput onUpdateOptions={setOptions} onDone={() => stateMachine.current.transition("criteria")} />
      )}
      {stateMachine.current.isCurrent("criteria") && (
        <CriteriaInput onUpdateCriteria={setCriteria} onDone={() => stateMachine.current.transition("grid")} />
      )}
      {stateMachine.current.isCurrent("grid") && (
        <GridInput options={options} setOptions={setOptions} criteria={criteria} setCriteria={setCriteria} />
      )}
    </div>
  );
}
