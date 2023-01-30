import { Optional } from "./types";
import State from "./state";

export default class StateMachine {
  _current: State;
  _states: State[];

  constructor(initialName: string) {
    const initial = new State(initialName);
    this._current = initial;
    this._states = [initial];
  }

  getCurrent(): string {
    return this._current.name;
  }

  isCurrent(name: string) {
    return this._current.name == name;
  }

  addState(name: string): StateMachine {
    if (this._hasState(name)) {
      console.error(`State ${name} already exists in machine`);
    } else {
      this._states.push(new State(name));
    }
    return this;
  }

  _hasState(name: string): boolean {
    return !!this._states.find((state) => state.name == name);
  }

  _getState(name: string): Optional<State> {
    return this._states.find((state) => state.name == name);
  }

  addTransition(fromState: string, toState: string): StateMachine {
    const stateA = this._getState(fromState);
    const stateB = this._getState(toState);
    if (!stateA) {
      console.error(`State ${fromState} already exists in machine`);
    } else if (!stateB) {
      console.error(`State ${toState} already exists in machine`);
    } else {
      stateA.addNext(toState);
    }
    return this;
  }

  transition(to: string): StateMachine {
    const toState = this._getState(to);
    if (!toState) {
      console.error(`State ${to} not found in machine`);
    } else if (!this._current.hasNext(to)) {
      console.error(`State ${to} cannot be transitioned to from current state ${this._current.name}`);
    } else {
      this._current = toState;
    }
    return this;
  }
}
