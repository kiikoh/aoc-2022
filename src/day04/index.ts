import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => {
    const sides = line.split(",");

    return sides.map((side) => {
      const [left, right] = side.split("-").map((s) => parseInt(s));
      return { left, right };
    });
  });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let count = 0;

  for (const pair of input) {
    const [elf1, elf2] = pair;

    if (elf1.left <= elf2.left && elf1.right >= elf2.right) {
      count++;
    } else if (elf2.left <= elf1.left && elf2.right >= elf1.right) {
      count++;
    }
  }

  return count;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let count = 0;

  for (const pair of input) {
    const [elf1, elf2] = pair;

    if (elf1.right >= elf2.left && elf1.right <= elf2.right) {
      count++;
    } else if (elf2.right >= elf1.left && elf2.right <= elf1.right) {
      count++;
    }
  }

  return count;
};

run({
  part1: {
    tests: [
      {
        input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
