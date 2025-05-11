const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, m, k] = input.shift().split(" ").map(Number);
const graph = [];
let dice = { up: 1, down: 6, east: 3, west: 4, north: 2, south: 5 };
let dir = 0;
let answer = 0;

for (let i = 0; i < n; i++) {
  graph.push(input[i].split(" ").map(Number));
}

class Queue {
  items = [];
  start = 0;
  end = 0;

  push(value) {
    this.items.push(value);
    this.end++;
  }

  pop() {
    return this.items[this.start++];
  }

  isEmpty() {
    return this.start === this.end;
  }
}

const path = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

// 점수 구하기
function BFS(x, y) {
  const visited = Array.from({ length: n }, () => Array(m).fill(false));
  visited[x][y] = true;
  const q = new Queue();
  q.push([x, y]);
  const check = graph[x][y];
  let cnt = 1;

  while (!q.isEmpty()) {
    const [x, y] = q.pop();
    for (let i = 0; i < 4; i++) {
      const nx = x + path[i][0];
      const ny = y + path[i][1];

      if (
        0 <= nx &&
        nx < n &&
        0 <= ny &&
        ny < m &&
        !visited[nx][ny] &&
        graph[nx][ny] === check
      ) {
        visited[nx][ny] = true;
        q.push([nx, ny]);
        cnt++;
      }
    }
  }
  return cnt;
}

// 굴리기

function roll(dir) {
  switch (dir) {
    // 동
    case 0:
      dice = {
        up: dice["west"],
        down: dice["east"],
        east: dice["up"],
        west: dice["down"],
        north: dice["north"],
        south: dice["south"],
      };
      break;
    // 남
    case 1:
      dice = {
        up: dice["north"],
        down: dice["south"],
        east: dice["east"],
        west: dice["west"],
        north: dice["down"],
        south: dice["up"],
      };
      break;

    // 서
    case 2:
      dice = {
        up: dice["east"],
        down: dice["west"],
        east: dice["down"],
        west: dice["up"],
        north: dice["north"],
        south: dice["south"],
      };
      break;

    // 북
    case 3:
      dice = {
        up: dice["south"],
        down: dice["north"],
        east: dice["east"],
        west: dice["west"],
        north: dice["up"],
        south: dice["down"],
      };
      break;
  }
}

let [startX, startY] = [0, 0];
for (let i = 0; i < k; i++) {
  // 굴리기
  let [newX, newY] = [startX + path[dir][0], startY + path[dir][1]];
  // 만약 경계를 벗어나면 이동방향 반대로하고 굴려야함.
  if (0 > newX || newX >= n || 0 > newY || newY >= m) {
    dir = (dir + 2) % 4;
    [newX, newY] = [startX + path[dir][0], startY + path[dir][1]];
  }
  [startX, startY] = [newX, newY];
  roll(dir);

  // 점수 구하기
  const check = graph[startX][startY];

  answer += check * BFS(startX, startY);

  // 이동 방향 변경
  const diceBottom = dice["down"];

  if (diceBottom > check) {
    dir = (dir + 1) % 4;
  } else if (diceBottom < check) {
    dir = dir - 1;
    if (dir === -1) {
      dir = 3;
    }
  }
}

console.log(answer);