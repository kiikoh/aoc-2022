import run from "aocrunner";

type File = {
  name: string;
  size: number;
};

type Directory = {
  name: string;
  contents: (File | Directory)[];
  size?: number;
};

const isFile = (item: File | Directory): item is File => {
  return (item as File).size !== undefined;
};

const parseInput = (rawInput: string) => {
  const root: Directory = {
    name: "/",
    contents: [],
  };

  let cwd = "/";

  const lines = rawInput
    .split("$")
    .slice(1)
    .map((line) => line.trim().split("\n"));

  for (const line of lines) {
    if (line[0] === "cd /") {
      cwd = "/";
    } else if (line[0] === "cd ..") {
      cwd = cwd.split("/").slice(0, -1).join("/");
    } else if (line[0].startsWith("cd")) {
      cwd += cwd !== "/" ? "/" + line[0].slice(3) : line[0].slice(3);
    } else if (line[0] === "ls") {
      const contents = line.slice(1);
      for (let item of contents) {
        if (item.startsWith("dir")) {
          const name = item.slice(4);
          const directory: Directory = {
            name,
            contents: [],
          };
          getDirectoryByPath(root, cwd).contents.push(directory);
        } else {
          const [size, name] = item.split(" ");
          const file: File = {
            name,
            size: parseInt(size),
          };
          getDirectoryByPath(root, cwd).contents.push(file);
        }
      }
    }
  }

  return root;
};

const getDirectoryByPath = (root: Directory, path: string): Directory => {
  if (path === "/") {
    return root;
  }
  const parts = path.split("/");
  let current = root;
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    const directory = current.contents.find(
      (item) => item.name === part,
    ) as Directory;
    current = directory;
  }
  return current;
};

const part1 = (rawInput: string) => {
  const root = parseInput(rawInput);
  const dirSizes: number[] = [];

  // calculate the size of each nested directory, dynamic programming style
  const calculateContents = (directory: Directory): number => {
    let size = 0;
    for (let item of directory.contents) {
      size += isFile(item) ? item.size : calculateContents(item);
    }
    directory.size = size;
    dirSizes.push(size);

    return size;
  };

  calculateContents(root);
  // console.log(JSON.stringify(root, null, 2));

  return dirSizes.reduce((a, b) => (b < 100000 ? a + b : a), 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const root = parseInput(rawInput);
  const dirSizes: number[] = [];

  // calculate the size of each nested directory, dynamic programming style
  const calculateContents = (directory: Directory): number => {
    let size = 0;
    for (let item of directory.contents) {
      size += isFile(item) ? item.size : calculateContents(item);
    }
    directory.size = size;
    dirSizes.push(size);

    return size;
  };

  const inUse = calculateContents(root);
  const minRemoval = 30000000 - (70000000 - inUse);

  console.log(JSON.stringify(root, null, 2));
  console.log(minRemoval);

  return dirSizes.filter((size) => size >= minRemoval).sort((a, b) => a - b)[0];
};

run({
  part1: {
    tests: [
      {
        input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 24933642,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
