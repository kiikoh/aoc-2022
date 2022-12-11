import run from "aocrunner";

type Monkey = {
  startingItems: number[];
  operation: (old: number) => number;
  testFn: (worry: number) => boolean;
  ifTrue: number;
  ifFalse: number;

  itemsInspected: number;
  divisibleBy: number;
};

const parseInput = (rawInput: string) => {
  const lines = rawInput.split("\n");

  const monkeys: Monkey[] = [];
  for (let i = 0; i < lines.length; i += 7) {
    const startingItems = lines[i + 1].split(": ")[1].split(", ").map(Number);
    const operation = lines[i + 2].split(": ")[1];
    const divisibleBy = Number(lines[i + 3].split("by ")[1]);
    const ifTrue = Number(lines[i + 4].split("monkey ")[1]);
    const ifFalse = Number(lines[i + 5].split("monkey ")[1]);

    const getOperation = (operation: string) => {
      const [_, op, right] = operation.split("= ")[1].split(" ");

      if (op === "+") {
        return (old: number) => old + (Number(right) || old);
      }

      if (op === "*") {
        return (old: number) => old * (Number(right) || old);
      }

      return (old: number) => old;
    };

    const testFn = (worry: number) => worry % divisibleBy === 0;

    monkeys.push({
      startingItems,
      operation: getOperation(operation),
      testFn,
      ifTrue,
      ifFalse,
      itemsInspected: 0,
      divisibleBy,
    });
  }

  return monkeys;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let rounds = 0;

  while (rounds < 20) {
    for (let monkey of input) {
      // while a monkey has an item to throw
      while (monkey.startingItems.length > 0) {
        const item = monkey.startingItems.shift()!;
        const newItem = Math.floor(monkey.operation(item) / 3);
        const target = monkey.testFn(newItem) ? monkey.ifTrue : monkey.ifFalse;
        input[target].startingItems.push(newItem);

        monkey.itemsInspected++;

        // console.log(
        //   `Monkey ${input.indexOf(
        //     monkey,
        //   )}: ${item} -> ${newItem} -> Monkey ${target}`,
        // );
      }
    }
    rounds++;
  }

  return input
    .sort((a, b) => b.itemsInspected - a.itemsInspected)
    .slice(0, 2)
    .reduce((acc, cur) => acc * cur.itemsInspected, 1);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let rounds = 0;
  let lcm = 1;

  for (let monkey of input) {
    lcm = lcm * monkey.divisibleBy;
  }

  while (rounds < 10000) {
    for (let monkey of input) {
      // while a monkey has an item to throw
      while (monkey.startingItems.length > 0) {
        const item = monkey.startingItems.shift()!;
        const newItem = monkey.operation(item) % lcm;
        const target = monkey.testFn(newItem) ? monkey.ifTrue : monkey.ifFalse;
        input[target].startingItems.push(newItem);

        monkey.itemsInspected++;

        // console.log(
        //   `Monkey ${input.indexOf(
        //     monkey,
        //   )}: ${item} -> ${newItem} -> Monkey ${target}`,
        // );
      }
    }
    rounds++;
  }

  return input
    .sort((a, b) => b.itemsInspected - a.itemsInspected)
    .slice(0, 2)
    .reduce((acc, cur) => acc * cur.itemsInspected, 1);
};

run({
  part1: {
    tests: [
      {
        input: `
        Monkey 0:
          Starting items: 79, 98
          Operation: new = old * 19
          Test: divisible by 23
            If true: throw to monkey 2
            If false: throw to monkey 3
        
        Monkey 1:
          Starting items: 54, 65, 75, 74
          Operation: new = old + 6
          Test: divisible by 19
            If true: throw to monkey 2
            If false: throw to monkey 0
        
        Monkey 2:
          Starting items: 79, 60, 97
          Operation: new = old * old
          Test: divisible by 13
            If true: throw to monkey 1
            If false: throw to monkey 3
        
        Monkey 3:
          Starting items: 74
          Operation: new = old + 3
          Test: divisible by 17
            If true: throw to monkey 0
            If false: throw to monkey 1
        `,
        expected: 10605,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Monkey 0:
          Starting items: 79, 98
          Operation: new = old * 19
          Test: divisible by 23
            If true: throw to monkey 2
            If false: throw to monkey 3
        
        Monkey 1:
          Starting items: 54, 65, 75, 74
          Operation: new = old + 6
          Test: divisible by 19
            If true: throw to monkey 2
            If false: throw to monkey 0
        
        Monkey 2:
          Starting items: 79, 60, 97
          Operation: new = old * old
          Test: divisible by 13
            If true: throw to monkey 1
            If false: throw to monkey 3
        
        Monkey 3:
          Starting items: 74
          Operation: new = old + 3
          Test: divisible by 17
            If true: throw to monkey 0
            If false: throw to monkey 1
        `,
        expected: 2713310158,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
