import run from "aocrunner";

type Move = {
  direction: string;
  distance: number;
};

type Node = {
  x: number;
  y: number;
};

const parseInput = (rawInput: string): Move[] =>
  rawInput.split("\n").map((line) => {
    const [direction, distance] = line.split(" ");

    return {
      direction,
      distance: parseInt(distance, 10),
    };
  });

// const distance = (a: Node, b: Node) => {
//   return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
// };
const isTouching = (a: Node, b: Node) => {
  return Math.abs(a.x - b.x) <= 1 && Math.abs(a.y - b.y) <= 1;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const head: Node = { x: 0, y: 0 };
  const tail: Node = { x: 0, y: 0 };
  const visitedByTail: Set<string> = new Set();
  visitedByTail.add(JSON.stringify(tail));

  for (const move of input) {
    // move 1 at a time
    for (let i = 0; i < move.distance; i++) {
      switch (move.direction) {
        case "R":
          head.x += 1;
          break;
        case "L":
          head.x -= 1;
          break;
        case "U":
          head.y += 1;
          break;
        case "D":
          head.y -= 1;
          break;
      }

      if (!isTouching(head, tail)) {
        if (head.y > tail.y) {
          tail.y += 1;
        } else if (head.y < tail.y) {
          tail.y -= 1;
        }

        if (head.x > tail.x) {
          tail.x += 1;
        } else if (head.x < tail.x) {
          tail.x -= 1;
        }
        visitedByTail.add(JSON.stringify(tail));
      }
    }

    // console.log(head);
    // console.log(tail);
    // console.log(visitedByTail);
    // console.log(isTouching(head, tail));
  }

  return visitedByTail.size;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rope: Node[] = [];

  for (let i = 0; i < 10; i++) rope.push({ x: 0, y: 0 });

  const visitedByTail: Set<string> = new Set();
  visitedByTail.add(JSON.stringify(rope.at(-1)));

  for (const move of input) {
    // move head 1 at a time
    for (let i = 0; i < move.distance; i++) {
      switch (move.direction) {
        case "R":
          rope[0].x += 1;
          break;
        case "L":
          rope[0].x -= 1;
          break;
        case "U":
          rope[0].y += 1;
          break;
        case "D":
          rope[0].y -= 1;
          break;
      }

      //move each of the other nodes in response to the head
      for (let j = 1; j < rope.length; j++) {
        if (!isTouching(rope[j - 1], rope[j])) {
          if (rope[j - 1].y > rope[j].y) {
            rope[j].y += 1;
          } else if (rope[j - 1].y < rope[j].y) {
            rope[j].y -= 1;
          }

          if (rope[j - 1].x > rope[j].x) {
            rope[j].x += 1;
          } else if (rope[j - 1].x < rope[j].x) {
            rope[j].x -= 1;
          }
        }
      }
      visitedByTail.add(JSON.stringify(rope.at(-1)));
    }
    // console.log(rope);
  }
  return visitedByTail.size;
};

run({
  part1: {
    tests: [
      {
        input: `
          R 4
          U 4
          L 3
          D 1
          R 4
          D 1
          L 5
          R 2`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          R 5
          U 8
          L 8
          D 3
          R 17
          D 10
          L 25
          U 20`,
        expected: 36,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
