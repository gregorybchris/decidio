import { None, Optional } from "../types";

import Decision from "../models/decision";
import { useStorage } from "./storage";

export function useDecisions() {
  const [storageString, storageSave, storageLoad] = useStorage("decidio");
  const decisions: Decision[] = storageString === None ? [] : JSON.parse(storageString);

  function saveDecisions(decisions: Decision[]): void {
    storageSave(JSON.stringify(decisions));
  }

  function loadDecisions(): Decision[] {
    const storageString = storageLoad();
    return storageString === None ? [] : JSON.parse(storageString);
  }

  return [decisions, saveDecisions, loadDecisions] as const;
}

export function useDecision(slug: Optional<string> = None) {
  const [decisions, saveDecisions, loadDecisions] = useDecisions();
  const decision = decisions.find((d) => d.slug == slug);

  function saveDecision(decision: Decision): void {
    const filtered = decisions.filter((d) => d.slug != slug);
    saveDecisions([...filtered, decision]);
  }

  function loadDecision(): Optional<Decision> {
    return loadDecisions().find((d) => d.slug == slug);
  }

  return [decision, saveDecision, loadDecision] as const;
}
