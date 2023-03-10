import { zeros, zeros2d } from "../lib/utilities/mathUtilities";

import { DateTime } from "luxon";
import Decision from "../lib/models/decision";
import NewCriteria from "./NewCriteria";
import NewOptions from "./NewOptions";
import StateMachine from "../lib/state/stateMachine";
import humanId from "human-id";
import { useDecision } from "../lib/hooks/decisionStorage";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useRerender } from "../lib/hooks/render";

export default function New() {
  const options = useRef<string[]>([]);
  const criteria = useRef<string[]>([]);
  const stateMachine = useRef(new StateMachine("options").addState("criteria").addTransition("options", "criteria"));
  const navigate = useNavigate();
  const rerender = useRerender();
  const [decision, saveDecision, loadDecision] = useDecision();
  const machine = stateMachine.current;

  function transition(state: string) {
    machine.transition(state);
    rerender();
  }

  function openEditor() {
    const slug = humanId({
      separator: "-",
      capitalize: false,
    });

    const id = crypto.randomUUID();
    const created = DateTime.now().toISO();
    const newDecision: Decision = {
      id,
      slug: slug,
      name: slug,
      created,
      options: options.current,
      criteria: criteria.current,
      weights: zeros(criteria.current.length),
      scores: zeros2d(criteria.current.length, options.current.length),
    };
    saveDecision(newDecision);
    navigate(`/editor/${slug}`);
  }

  function onOptionsDone(newOptions: string[]) {
    options.current = newOptions;
    transition("criteria");
  }

  function onCriteriaDone(newCriteria: string[]) {
    criteria.current = newCriteria;
    openEditor();
  }

  return (
    <div>
      {machine.isCurrent("options") && <NewOptions onNext={onOptionsDone} onSkip={openEditor} />}
      {machine.isCurrent("criteria") && <NewCriteria onNext={onCriteriaDone} onSkip={openEditor} />}
    </div>
  );
}
