import run from "aocrunner";
import { Console } from "console";

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n\n")
    .map((group) => group.split("\n").map((line) => JSON.parse(line)));

const compare = (left: any, right: any): number => {
  if (left === right) {
    return 0;
  }

  if (left === undefined) {
    return -1;
  }

  if (right === undefined) {
    return 1;
  }

  if (typeof left === "number" && typeof right === "number") {
    return left - right;
  }

  if (typeof left === "number") {
    return compare([left], right);
  }

  if (typeof right === "number") {
    return compare(left, [right]);
  }

  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    const val = compare(left[i], right[i]);

    if (val === 0) {
      continue;
    }

    return val;
  }

  return 0;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let sum = 0;

  for (let i = 0; i < input.length; i++) {
    const [left, right] = input[i];
    if (compare(left, right) <= 0) {
      sum += i + 1;
    }
  }

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).flat();
  input.push([[2]], [[6]]);

  const ordered = input.sort((a, b) => compare(a, b));

  let two = 0;
  let six = 0;
  for (let i = 0; i < ordered.length; i++) {
    const packet = ordered[i];
    if (JSON.stringify(packet) === "[[2]]") {
      two = i + 1;
    }
    if (JSON.stringify(packet) === "[[6]]") {
      six = i + 1;
    }
    // console.log(i + 1, JSON.stringify(packet));
  }

  // console.log(two, six);

  return two * six;
};

run({
  part1: {
    tests: [
      {
        input: `
          [1,1,3,1,1]
          [1,1,5,1,1]

          [[1],[2,3,4]]
          [[1],4]

          [9]
          [[8,7,6]]

          [[4,4],4,4]
          [[4,4],4,4,4]

          [7,7,7,7]
          [7,7,7]

          []
          [3]

          [[[]]]
          [[]]

          [1,[2,[3,[4,[5,6,7]]]],8,9]
          [1,[2,[3,[4,[5,6,0]]]],8,9]
        `,
        expected: 13,
      },
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
