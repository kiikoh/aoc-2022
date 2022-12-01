import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const calCount = input.split("\n\n").map((group) => {
    let nums = group.split("\n").map((num) => parseInt(num));
    return nums.reduce((a, b) => a + b, 0);
  });

  return calCount.reduce((a, b) => (a > b ? a : b), 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const calCount = input.split("\n\n").map((group) => {
    let nums = group.split("\n").map((num) => parseInt(num));
    return nums.reduce((a, b) => a + b, 0);
  });

  return calCount
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b, 0);
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
