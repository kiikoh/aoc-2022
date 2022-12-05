import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n\n").map((x) => x.split("\n"));

const part1 = (rawInput: string) => {
  const [initial, procedures] = parseInput(rawInput);

  const indexes = initial[initial.length - 1];

  const stacks: string[][] = [];
  // for each column a number is specified, a stack exists above it
  for (let i = 0; i < indexes.length; i++) {
    const stackIndex = parseInt(indexes[i]);

    if (!isNaN(stackIndex)) {
      stacks.push([]);
      for (let j = initial.length - 2; j >= 0; j--) {
        if (initial[j][i] !== " ") {
          stacks[stackIndex - 1].push(initial[j][i]);
        }
      }
    }
  }

  for (let proc of procedures) {
    const [quantity, from, to] = proc
      .split(" ")
      .map((x) => parseInt(x))
      .filter((x) => !isNaN(x));

    for (let i = 0; i < quantity; i++) {
      const pop = stacks[from - 1].pop();
      if (pop) {
        stacks[to - 1].push(pop);
      }
    }
  }

  // return the last element of each stack
  return stacks
    .map((stack) => stack.at(-1))
    .filter(Boolean)
    .join("");
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const [initial, procedures] = parseInput(rawInput);

  const indexes = initial[initial.length - 1];

  const stacks: string[][] = [];
  // for each column a number is specified, a stack exists above it
  for (let i = 0; i < indexes.length; i++) {
    const stackIndex = parseInt(indexes[i]);

    if (!isNaN(stackIndex)) {
      stacks.push([]);
      for (let j = initial.length - 2; j >= 0; j--) {
        if (initial[j][i] !== " ") {
          stacks[stackIndex - 1].push(initial[j][i]);
        }
      }
    }
  }

  for (let proc of procedures) {
    const [quantity, from, to] = proc
      .split(" ")
      .map((x) => parseInt(x))
      .filter((x) => !isNaN(x));

    const tempStack = [];
    for (let i = 0; i < quantity; i++) {
      const pop = stacks[from - 1].pop();
      if (pop) {
        tempStack.push(pop);
      }
    }
    while (tempStack.length > 0) {
      stacks[to - 1].push(tempStack.pop()!);
    }
  }

  // return the last element of each stack
  return stacks
    .map((stack) => stack.at(-1))
    .filter(Boolean)
    .join("");
};

run({
  part1: {
    tests: [
      {
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "CMZ",
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
  trimTestInputs: false,
  onlyTests: false,
});
