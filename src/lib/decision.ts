import { Optional } from "./types";

export default interface Decision {
  name: Optional<string>;
  options: string[];
  criteria: string[];
  weights: number[];
  scores: number[][];
}
