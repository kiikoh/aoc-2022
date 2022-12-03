import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const inCommon = (a: string, b: string, c?: string) => {
  for (const char of a) {
    if (b.includes(char) && (!c || c.includes(char))) {
      return char;
    }
  }
  return false;
};

const getPriority = (char: string) => {
  return "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(char);
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).map((line) => [
    line.slice(0, line.length / 2),
    line.slice(line.length / 2),
  ]);

  let priority = 0;

  for (const [a, b] of input) {
    const common = inCommon(a, b);
    if (common) {
      priority += getPriority(common);
    }
  }

  return priority;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let priority = 0;

  for (let i = 0; i < input.length; i += 3) {
    const common = inCommon(input[i], input[i + 1], input[i + 2]);
    if (common) {
      priority += getPriority(common);
    }
  }

  return priority;
};

run({
  part1: {
    tests: [
      {
        input: `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
