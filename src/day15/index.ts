import run from "aocrunner";

type Sensor = {
  x: number;
  y: number;
  closestBeacon: {
    x: number;
    y: number;
    distance: number;
  };
};

const distance = (x1: number, y1: number, x2: number, y2: number) =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2);

const parseInput = (rawInput: string): Sensor[] =>
  rawInput.split("\n").map((line) => {
    const [x, y, bX, bY] = line.match(/\d+/g)!.map(Number);

    return {
      x,
      y,
      closestBeacon: {
        x: bX,
        y: bY,
        distance: distance(x, y, bX, bY),
      },
    };
  });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const minWidth = Math.min(
    ...input.map((sensor) =>
      Math.min(sensor.x - sensor.closestBeacon.x, sensor.closestBeacon.x),
    ),
  );

  const maxWidth = Math.max(
    ...input.map((sensor) =>
      Math.max(sensor.x + sensor.closestBeacon.x, sensor.closestBeacon.x),
    ),
  );

  console.log(minWidth, maxWidth);

  let noBeacon = 0;
  for (let i = minWidth; i < maxWidth; i++) {
    //see if any sensors can see this point at y=2000000
    for (let sensor of input) {
      if (i === sensor.closestBeacon.x && 2000000 === sensor.closestBeacon.y) {
        continue;
      }

      if (
        distance(i, 2000000, sensor.x, sensor.y) <=
        sensor.closestBeacon.distance
      ) {
        noBeacon++;
        break;
      }
    }
  }

  return noBeacon;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: `
      //     Sensor at x=2, y=18: closest beacon is at x=-2, y=15
      //     Sensor at x=9, y=16: closest beacon is at x=10, y=16
      //     Sensor at x=13, y=2: closest beacon is at x=15, y=3
      //     Sensor at x=12, y=14: closest beacon is at x=10, y=16
      //     Sensor at x=10, y=20: closest beacon is at x=10, y=16
      //     Sensor at x=14, y=17: closest beacon is at x=10, y=16
      //     Sensor at x=8, y=7: closest beacon is at x=2, y=10
      //     Sensor at x=2, y=0: closest beacon is at x=2, y=10
      //     Sensor at x=0, y=11: closest beacon is at x=2, y=10
      //     Sensor at x=20, y=14: closest beacon is at x=25, y=17
      //     Sensor at x=17, y=20: closest beacon is at x=21, y=22
      //     Sensor at x=16, y=7: closest beacon is at x=15, y=3
      //     Sensor at x=14, y=3: closest beacon is at x=15, y=3
      //     Sensor at x=20, y=1: closest beacon is at x=15, y=3
      //   `,
      //   expected: 26,
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
