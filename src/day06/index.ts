import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const WINDOW = 4;
  for (let i = WINDOW; i < input.length; i++) {
    const window = input.slice(i - WINDOW, i);
    const set = new Set(window);

    if (set.size === WINDOW) {
      return i;
    }
  }

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const WINDOW = 14;
  for (let i = WINDOW; i < input.length; i++) {
    const window = input.slice(i - WINDOW, i);
    const set = new Set(window);

    if (set.size === WINDOW) {
      return i;
    }
  }

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
