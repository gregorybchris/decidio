import { useRef, useState } from "react";

import CriteriaInput from "./CriteriaInput";
import { DateTime } from "luxon";
import Decision from "../lib/models/decision";
import { None } from "../lib/types";
import OptionsInput from "./OptionsInput";
import StateMachine from "../lib/state/stateMachine";
import humanId from "human-id";
import { useDecision } from "../lib/hooks/decision";
import { useNavigate } from "react-router-dom";
import { useRerender } from "../lib/hooks/render";

export default function New() {
  const options = useRef<string[]>([]);
  const criteria = useRef<string[]>([]);
  const stateMachine = useRef(new StateMachine("options").addState("criteria").addTransition("options", "criteria"));
  const navigate = useNavigate();
  const rerender = useRerender();
  const [decision, setDecision, loadDecision] = useDecision();
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
      weights: None,
      scores: None,
    };
    setDecision(newDecision);
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
      {machine.isCurrent("options") && <OptionsInput onDone={onOptionsDone} onSkip={openEditor} />}
      {machine.isCurrent("criteria") && <CriteriaInput onDone={onCriteriaDone} onSkip={openEditor} />}
    </div>
  );
}
