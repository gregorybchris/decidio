import { Optional } from "../types";

export default interface Decision {
  id: string;
  slug: string;
  name: string;
  created: string;
  options: string[];
  criteria: string[];
  weights: Optional<number[]>;
  scores: Optional<number[][]>;
}
