const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [r, c] = input.shift().split(" ").map(Number);
const graph = [];

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

const q = new Queue();

for (let i = 0; i < r; i++) {
  graph.push(input[i].split(""));
  for (let j = 0; j < c; j++) {
    if (graph[i][j] === "*") {
      q.push([i, j, 0]);
    } else if (graph[i][j] === "D") {
      [endX, endY] = [i, j];
    }
  }
}

for (let i = 0; i < r; i++) {
  for (let j = 0; j < c; j++) {
    if (graph[i][j] === "S") {
      q.push([i, j, 0]);
    }
  }
}

const path = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function BFS() {
  while (!q.isEmpty()) {
    const [x, y, time] = q.pop();

    for (let i = 0; i < 4; i++) {
      const nx = x + path[i][0];
      const ny = y + path[i][1];
      if (0 <= nx && nx < r && 0 <= ny && ny < c) {
        // 물 먼저 옮기기
        if (graph[x][y] === "*" && graph[nx][ny] === ".") {
          q.push([nx, ny, time + 1]);
          graph[nx][ny] = "*";
        }
        // 고슴도치 옮기기
        if (
          graph[x][y] === "S" &&
          (graph[nx][ny] === "." || graph[nx][ny] === "D")
        ) {
          if (graph[nx][ny] === "D") {
            return time + 1;
          }
          q.push([nx, ny, time + 1]);
          graph[nx][ny] = "S";
        }
      }
    }
  }
  return -1;
}

let answer = BFS();
answer === -1 ? console.log("KAKTUS") : console.log(answer);