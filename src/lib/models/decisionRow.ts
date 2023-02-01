export default interface OptionRow {
  criterion: string;
  weight: number;
  [x: string | symbol]: unknown;
}
