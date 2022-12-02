import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => {
    const [opponent, you] = line.split(" ");

    return {
      opponent,
      you,
    };
  });

const letterToPlay = (letter: string) => {
  switch (letter) {
    case "A":
    case "X":
      return "Rock";
    case "B":
    case "Y":
      return "Paper";
    case "C":
    case "Z":
      return "Scissors";
  }
};

const points = [, "Rock", "Paper", "Scissors"];

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).map(({ opponent, you }) => {
    return {
      opponent: letterToPlay(opponent),
      you: letterToPlay(you),
    };
  });

  return input.reduce((score, { opponent, you }) => {
    if (!opponent || !you) throw new Error("Invalid input");

    if (opponent === you) {
      return score + 3 + points.indexOf(you);
    }

    if (
      (opponent === "Rock" && you === "Scissors") ||
      (opponent === "Paper" && you === "Rock") ||
      (opponent === "Scissors" && you === "Paper")
    ) {
      return score + points.indexOf(you);
    }

    return score + 6 + points.indexOf(you);
  }, 0);
};

const letterToPlayToBeat = (opponent: string, result: "X" | "Y" | "Z") => {
  const winOrLose = {
    X: "Lose",
    Y: "Tie",
    Z: "Win",
  };

  switch (opponent) {
    case "Rock":
      return winOrLose[result] === "Win"
        ? "Paper"
        : winOrLose[result] === "Tie"
        ? "Rock"
        : "Scissors";
    case "Paper":
      return winOrLose[result] === "Win"
        ? "Scissors"
        : winOrLose[result] === "Tie"
        ? "Paper"
        : "Rock";
    case "Scissors":
      return winOrLose[result] === "Win"
        ? "Rock"
        : winOrLose[result] === "Tie"
        ? "Scissors"
        : "Paper";
  }
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).map(({ opponent, you }) => {
    return {
      opponent: letterToPlay(opponent),
      you: letterToPlayToBeat(letterToPlay(opponent)!, you as "X" | "Y" | "Z"),
    };
  });

  return input.reduce((score, { opponent, you }) => {
    if (!opponent || !you) throw new Error("Invalid input");

    if (opponent === you) {
      return score + 3 + points.indexOf(you);
    }

    if (
      (opponent === "Rock" && you === "Scissors") ||
      (opponent === "Paper" && you === "Rock") ||
      (opponent === "Scissors" && you === "Paper")
    ) {
      return score + points.indexOf(you);
    }

    return score + 6 + points.indexOf(you);
  }, 0);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
          A Y
          B X
          C Z
        `,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          A Y
          B X
          C Z
        `,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
