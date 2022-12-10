import run from "aocrunner";

const parseInput = (rawInput: string): Instruction[] =>
  rawInput
    .split("\n")
    .map((line) => {
      const [type, value] = line.split(" ");

      if (type === "noop") {
        return [
          {
            type: "noop",
          },
        ] as Instruction[];
      }

      if (type !== "addx") {
        throw new Error(`Unknown instruction type: ${type}`);
      }

      return [
        {
          type: "noop",
        },
        {
          type,
          value: parseInt(value, 10),
        },
      ] as Instruction[];
    })
    .flat();

type Instruction =
  | {
      type: "noop";
    }
  | {
      type: "addx";
      value: number;
    };

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let cycles = 0;
  let xReg = 1;
  let signalStrength = 0;

  while (cycles < input.length) {
    const instruction = input[cycles];

    if (instruction.type === "addx") {
      xReg += instruction.value;
    }
    // console.log(cycles, xReg);
    cycles++;

    if (cycles % 40 === 19) {
      // console.log(cycles + 1, xReg);
      signalStrength += (cycles + 1) * xReg;
    }
  }

  return signalStrength;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let cycles = 0;
  let xReg = 1;
  let screen = "";

  while (cycles < input.length && cycles < 240) {
    const instruction = input[cycles++];

    if (instruction.type === "addx") {
      xReg += instruction.value;
    }

    screen += Math.abs(xReg - (cycles % 40)) < 2 ? "#" : ".";
    // console.log(cycles, xReg);
  }

  for (let i = 0; i < 6; i++) {
    console.log(screen.slice(i * 40, (i + 1) * 40));
  }

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
          addx 15
          addx -11
          addx 6
          addx -3
          addx 5
          addx -1
          addx -8
          addx 13
          addx 4
          noop
          addx -1
          addx 5
          addx -1
          addx 5
          addx -1
          addx 5
          addx -1
          addx 5
          addx -1
          addx -35
          addx 1
          addx 24
          addx -19
          addx 1
          addx 16
          addx -11
          noop
          noop
          addx 21
          addx -15
          noop
          noop
          addx -3
          addx 9
          addx 1
          addx -3
          addx 8
          addx 1
          addx 5
          noop
          noop
          noop
          noop
          noop
          addx -36
          noop
          addx 1
          addx 7
          noop
          noop
          noop
          addx 2
          addx 6
          noop
          noop
          noop
          noop
          noop
          addx 1
          noop
          noop
          addx 7
          addx 1
          noop
          addx -13
          addx 13
          addx 7
          noop
          addx 1
          addx -33
          noop
          noop
          noop
          addx 2
          noop
          noop
          noop
          addx 8
          noop
          addx -1
          addx 2
          addx 1
          noop
          addx 17
          addx -9
          addx 1
          addx 1
          addx -3
          addx 11
          noop
          noop
          addx 1
          noop
          addx 1
          noop
          noop
          addx -13
          addx -19
          addx 1
          addx 3
          addx 26
          addx -30
          addx 12
          addx -1
          addx 3
          addx 1
          noop
          noop
          noop
          addx -9
          addx 18
          addx 1
          addx 2
          noop
          noop
          addx 9
          noop
          noop
          noop
          addx -1
          addx 2
          addx -37
          addx 1
          addx 3
          noop
          addx 15
          addx -21
          addx 22
          addx -6
          addx 1
          noop
          addx 2
          addx 1
          noop
          addx -10
          noop
          noop
          addx 20
          addx 1
          addx 2
          addx 2
          addx -6
          addx -11
          noop
          noop
          noop
        `,
        expected: 13140,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: `##..##..##..##..##..##..##..##..##..##..
      //   ###...###...###...###...###...###...###.
      //   ####....####....####....####....####....
      //   #####.....#####.....#####.....#####.....
      //   ######......######......######......####
      //   #######.......#######.......#######.....`,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
