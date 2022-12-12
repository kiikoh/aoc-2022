import run from "aocrunner";
import graph, { Graph } from "graphlib";

type Node = {
  id: string;
  value: number;
};

const parseInput = (rawInput: string) => {
  const grid: Node[][] = rawInput.split("\n").map((line, y) =>
    line.split("").map((value, x) => ({
      id: value.toUpperCase() === value ? value : `X:${x} Y:${y}`,
      value:
        value.toUpperCase() === value
          ? value === "S"
            ? 97
            : 122
          : value.charCodeAt(0),
    })),
  );

  return grid;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  // console.log(input);

  // build the graph
  const g = new Graph();
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const node = input[y][x];

      //set edge to all neighbors
      const targets = [
        input[y - 1]?.[x],
        input[y + 1]?.[x],
        input[y]?.[x - 1],
        input[y]?.[x + 1],
      ];

      for (const target of targets) {
        if (target && node.value - target.value >= -1) {
          // console.log(
          //   String.fromCharCode(node.value),
          //   "->",
          //   String.fromCharCode(target.value),
          //   node.value - target.value,
          // );
          g.setEdge(node.id, target.id);
        }
      }
    }
  }

  return graph.alg.dijkstra(g, "S")["E"].distance;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let startNodes = input.flat().filter((node) => node.value === 97);

  for (let i = 0; i < startNodes.length; i++) {
    startNodes[i].id = `S${i}`;
  }

  // build the graph
  const g = new Graph();
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const node = input[y][x];

      //set edge to all neighbors
      const targets = [
        input[y - 1]?.[x],
        input[y + 1]?.[x],
        input[y]?.[x - 1],
        input[y]?.[x + 1],
      ];

      for (const target of targets) {
        if (target && node.value - target.value >= -1) {
          // console.log(
          //   String.fromCharCode(node.value),
          //   "->",
          //   String.fromCharCode(target.value),
          //   node.value - target.value,
          // );
          g.setEdge(node.id, target.id);
        }
      }
    }
  }

  // find the shortest path from each start node to the end node
  let shortestPath = Infinity;
  for (const startNode of startNodes) {
    const path = graph.alg.dijkstra(g, startNode.id)["E"].distance;
    if (path < shortestPath) {
      shortestPath = path;
    }
  }

  return shortestPath;
};

run({
  part1: {
    tests: [
      {
        input: `
          Sabqponm
          abcryxxl
          accszExk
          acctuvwj
          abdefghi
        `,
        expected: 31,
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
