import run from "aocrunner";

type Tree = {
  height: number;
  vTop: boolean;
  vBottom: boolean;
  vLeft: boolean;
  vRight: boolean;
};

const isVisible = (tree: Tree) =>
  tree.vTop || tree.vBottom || tree.vLeft || tree.vRight;

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) =>
    line.split("").map((height): Tree => {
      return {
        height: parseInt(height),
        vTop: false,
        vBottom: false,
        vLeft: false,
        vRight: false,
      };
    }),
  );

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  // check for visibilty from the top
  for (let x = 0; x < input.length; x++) {
    let currMax = -1;
    for (let y = 0; y < input[x].length; y++) {
      if (input[y][x].height > currMax) {
        input[y][x].vTop = true;
        currMax = input[y][x].height;
      }
    }
  }

  // check for visibilty from the bottom
  for (let x = 0; x < input.length; x++) {
    let currMax = -1;
    for (let y = input[x].length - 1; y >= 0; y--) {
      if (input[y][x].height > currMax) {
        input[y][x].vBottom = true;
        currMax = input[y][x].height;
      }
    }
  }

  // check for visibilty from the left
  for (let y = 0; y < input.length; y++) {
    let currMax = -1;
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x].height > currMax) {
        input[y][x].vLeft = true;
        currMax = input[y][x].height;
      }
    }
  }

  // check for visibilty from the right
  for (let y = 0; y < input.length; y++) {
    let currMax = -1;
    for (let x = input[y].length - 1; x >= 0; x--) {
      if (input[y][x].height > currMax) {
        input[y][x].vRight = true;
        currMax = input[y][x].height;
      }
    }
  }

  // console.log(
  //   input
  //     .map((row) => row.map((tree) => (isVisible(tree) ? "T" : ".")).join(""))
  //     .join("\n"),
  // );
  // console.log(
  //   input.map((row) => row.map((tree) => tree.height).join("")).join("\n"),
  // );

  return input.flat().reduce((acc, tree) => acc + (isVisible(tree) ? 1 : 0), 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const calculateScenicScore = (x: number, y: number): number => {
    const calcViewDistance = (dy: number, dx: number): number => {
      let distance = 0;
      let currX = x + dx;
      let currY = y + dy;
      while (input?.[currX]?.[currY] !== undefined) {
        distance++;

        if (input[currX][currY].height >= input[x][y].height) {
          distance;
          break;
        }
        currX += dx;
        currY += dy;
      }
      return distance;
    };

    const north = calcViewDistance(0, -1);
    // console.log("north: " + north);

    const south = calcViewDistance(0, 1);
    // console.log("south: " + south);

    const west = calcViewDistance(-1, 0);
    // console.log("west: " + west);

    const east = calcViewDistance(1, 0);
    // console.log("east: " + east);

    return north * south * west * east;
  };

  let max = 0;
  for (let x = 1; x < input.length - 1; x++) {
    for (let y = 1; y < input[x].length - 1; y++) {
      max = Math.max(calculateScenicScore(x, y), max);
    }
  }

  return max;
};

run({
  part1: {
    tests: [
      {
        input: `30373
25512
65332
33549
35390`,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `30373
25512
65332
33549
35390`,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
