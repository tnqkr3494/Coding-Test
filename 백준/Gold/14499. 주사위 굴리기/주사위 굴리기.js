const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

let [n, m, x, y, k] = input.shift().split(" ").map(Number);
const graph = [];
let dice = { top: 0, down: 0, east: 0, west: 0, north: 0, south: 0 };
let answer = [];

for (let i = 0; i < n; i++) {
  graph.push(input[i].split(" ").map(Number));
}
const order = input[n].split(" ").map(Number);

const path = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
];

// 주사위 굴리기
function turn(dir, dice) {
  switch (dir) {
    case 1: // 동쪽
      return {
        top: dice.west,
        down: dice.east,
        east: dice.top,
        west: dice.down,
        north: dice.north,
        south: dice.south,
      };
    case 2: // 서쪽
      return {
        top: dice.east,
        down: dice.west,
        east: dice.down,
        west: dice.top,
        north: dice.north,
        south: dice.south,
      };
    case 3: // 북쪽
      return {
        top: dice.south,
        down: dice.north,
        east: dice.east,
        west: dice.west,
        north: dice.top,
        south: dice.down,
      };
    case 4: // 남쪽
      return {
        top: dice.north,
        down: dice.south,
        east: dice.east,
        west: dice.west,
        north: dice.down,
        south: dice.top,
      };
  }
}

function sol(x, y, dice, order) {
  for (const e of order) {
    const nx = x + path[e - 1][0];
    const ny = y + path[e - 1][1];

    if (0 <= nx && nx < n && 0 <= ny && ny < m) {
      x = nx;
      y = ny;
      dice = turn(e, dice);

      if (graph[x][y] === 0) {
        graph[x][y] = dice.down;
      } else {
        dice.down = graph[x][y];
        graph[x][y] = 0;
      }

      answer.push(dice.top);
    }
  }
}

sol(x, y, dice, order);

console.log(answer.join("\n"));