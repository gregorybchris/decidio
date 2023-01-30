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
      .addTransition("options", "grid")
      .addTransition("criteria", "grid")
  );
  const [updater, setUpdater] = useState<boolean>(false);
  const machine = stateMachine.current;

  function rerender() {
    setUpdater((updater) => !updater);
  }

  function transition(state: string) {
    machine.transition(state);
    rerender();
  }

  return (
    <div>
      {machine.isCurrent("options") && (
        <OptionsInput
          onUpdateOptions={setOptions}
          onDone={() => transition("criteria")}
          onSkip={() => transition("grid")}
        />
      )}
      {machine.isCurrent("criteria") && (
        <CriteriaInput
          onUpdateCriteria={setCriteria}
          onDone={() => transition("grid")}
          onSkip={() => transition("grid")}
        />
      )}
      {machine.isCurrent("grid") && (
        <GridInput options={options} setOptions={setOptions} criteria={criteria} setCriteria={setCriteria} />
      )}
    </div>
  );
}
