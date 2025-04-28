const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, k] = input.shift().split(" ").map(Number);
let turn = 0;
const graph = [];
for (let i = 0; i < n; i++) {
  graph.push(input[i].split(" ").map(Number));
}

let horse = [[]];
for (let i = n; i < input.length; i++) {
  horse.push(input[i].split(" ").map((e) => Number(e) - 1));
}
let horseGraph = Array.from({ length: n }, () =>
  Array.from({ length: n }, () => [])
);

for (let i = 1; i <= k; i++) {
  const [x, y, dir] = horse[i];
  horseGraph[x][y].push(i);
}

const path = [
  [0, 1], // 오른쪽
  [0, -1], // 왼쪽
  [-1, 0], // 위
  [1, 0], // 아래
];

function done(arr) {
  if (arr.length >= 4) {
    console.log(turn);
    process.exit(0);
  }
}

function moveWhite(x, y, nx, ny, i) {
  const idx = horseGraph[x][y].findIndex((e) => e === i);
  const move = horseGraph[x][y].splice(idx);
  for (const h of move) {
    [horse[h][0], horse[h][1]] = [nx, ny];
  }
  horseGraph[nx][ny].push(...move);
  done(horseGraph[nx][ny]);
}

function moveRed(x, y, nx, ny, i) {
  const idx = horseGraph[x][y].findIndex((e) => e === i);
  const move = horseGraph[x][y].splice(idx).reverse();
  for (const h of move) {
    [horse[h][0], horse[h][1]] = [nx, ny];
  }
  horseGraph[nx][ny].push(...move);
  done(horseGraph[nx][ny]);
}

function moveBlue(x, y, i) {
  let [_, __, dir] = horse[i];
  dir = dir ^ 1; // 방향 반대로
  horse[i][2] = dir;

  const nx = x + path[dir][0];
  const ny = y + path[dir][1];

  // 이동하려는 칸이 범위 안이고, 파란색이 아니면 이동
  if (0 <= nx && nx < n && 0 <= ny && ny < n && graph[nx][ny] !== 2) {
    if (graph[nx][ny] === 0) moveWhite(x, y, nx, ny, i);
    else if (graph[nx][ny] === 1) moveRed(x, y, nx, ny, i);
  }
}

function moveHorse(i) {
  let [x, y, dir] = horse[i];
  let [nx, ny] = [x + path[dir][0], y + path[dir][1]];

  if (0 <= nx && nx < n && 0 <= ny && ny < n) {
    if (graph[nx][ny] === 0) {
      moveWhite(x, y, nx, ny, i);
    } else if (graph[nx][ny] === 1) {
      moveRed(x, y, nx, ny, i);
    } else {
      moveBlue(x, y, i);
    }
  } else {
    moveBlue(x, y, i);
  }
}

while (turn <= 1000) {
  turn++;
  for (let i = 1; i <= k; i++) {
    moveHorse(i);
  }
}
console.log(-1);