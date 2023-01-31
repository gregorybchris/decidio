export default class State {
  name: string;
  _nexts: string[];

  constructor(name: string) {
    this.name = name;
    this._nexts = [];
  }

  addNext(state: string) {
    this._nexts.push(state);
  }

  hasNext(state: string) {
    return this._nexts.includes(state);
  }
}
