import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const input = rawInput.split("\n");
  const walls = [];

  for (let wall of input) {
    const coords = wall.split(" -> ");

    for (let i = 0; i < coords.length - 1; i++) {
      walls.push([
        coords[i].split(",").map(Number),
        coords[i + 1].split(",").map(Number),
      ]);
    }
  }

  return walls;
};

//recursively drop sand one unit
const dropSand = (
  world: string[][],
  x: number,
  y: number,
): { x: number; y: number } => {
  if (!world[y + 1]?.[x] || world[0].includes("O")) return { x: -1, y: -1 };

  // the sands next position is occupied
  if (world[y + 1][x] !== "`") {
    //can the sand travel left and down?
    if (world[y + 1][x - 1] === "`") {
      return dropSand(world, x - 1, y + 1);
    }

    //can the sand travel right and down?
    if (world[y + 1][x + 1] === "`") {
      return dropSand(world, x + 1, y + 1);
    }

    return { x, y };
  }

  return dropSand(world, x, y + 1);
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const world: string[][] = new Array(200)
    .fill("`")
    .map(() => new Array(200).fill("`"));

  // draw walls
  for (let wall of input) {
    const [x1, y1] = wall[0];
    const [x2, y2] = wall[1];

    if (x1 === x2) {
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      for (let y = minY; y <= maxY; y++) {
        world[y][x1 - 400] = "#";
      }
    } else {
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      for (let x = minX; x <= maxX; x++) {
        world[y1][x - 400] = "#";
      }
    }
  }

  // find the lowest wall
  let lowestWall = 0;
  for (let i = world.length - 1; i > 0; i--) {
    if (world[i].includes("#")) {
      lowestWall = i;
      break;
    }
  }

  let count = 0;

  while (true) {
    const sandLoc = dropSand(world, 500 - 400, 0);
    if (sandLoc.x === -1) break;

    world[sandLoc.y][sandLoc.x] = "O";
    count++;
  }

  // // print world in a 200x200 grid
  // for (let i = 0; i < world.length; i++) {
  //   console.log(world[i].join(""));
  // }

  return count;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const world: string[][] = new Array(180)
    .fill("`")
    .map(() => new Array(1000).fill("`"));

  // draw walls
  for (let wall of input) {
    const [x1, y1] = wall[0];
    const [x2, y2] = wall[1];

    if (x1 === x2) {
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      for (let y = minY; y <= maxY; y++) {
        world[y][x1] = "#";
      }
    } else {
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      for (let x = minX; x <= maxX; x++) {
        world[y1][x] = "#";
      }
    }
  }

  // find the lowest wall
  let lowestWall = 0;
  for (let i = world.length - 1; i > 0; i--) {
    if (world[i].includes("#")) {
      lowestWall = i;
      break;
    }
  }

  // draw a wall two lower than the lowest wall
  for (let i = 0; i < world[lowestWall + 2].length; i++) {
    world[lowestWall + 2][i] = "#";
  }

  let count = 0;

  while (true) {
    const sandLoc = dropSand(world, 500, 0);
    // console.log(sandLoc);
    if (sandLoc.x === -1) break;

    world[sandLoc.y][sandLoc.x] = "O";
    count++;
  }

  // print world in a 200x200 grid
  // for (let i = 0; i < world.length; i++) {
  //   console.log(world[i].join(""));
  // }

  return count;
};

run({
  part1: {
    tests: [
      {
        input: `
          498,4 -> 498,6 -> 496,6
          503,4 -> 502,4 -> 502,9 -> 494,9
        `,
        expected: 24,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          498,4 -> 498,6 -> 496,6
          503,4 -> 502,4 -> 502,9 -> 494,9
        `,
        expected: 93,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
