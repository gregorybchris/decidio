import { faker } from "@faker-js/faker";

export type OptionRow = {
  option: string;
  weight: number;
  scoreA: number;
  scoreB: number;
  scoreC: number;
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newOptionRow = (): OptionRow => {
  return {
    option: faker.name.firstName(),
    weight: faker.datatype.number({ min: 1, max: 10 }),
    scoreA: faker.datatype.number({ min: 1, max: 5 }),
    scoreB: faker.datatype.number({ min: 1, max: 5 }),
    scoreC: faker.datatype.number({ min: 1, max: 5 }),
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): OptionRow[] => {
    const len = lens[depth]!;
    return range(len).map((d): OptionRow => {
      return {
        ...newOptionRow(),
      };
    });
  };

  return makeDataLevel();
}
