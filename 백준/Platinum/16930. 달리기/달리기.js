const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, m, k] = input.shift().split(" ").map(Number);
const graph = [];
for (let i = 0; i < n; i++) {
  graph.push(input[i].split(""));
}

const [x1, y1, x2, y2] = input[n].split(" ").map(Number);
const path = [
  [1, 0],
  [0, 1],
  [0, -1],
  [-1, 0],
];

class Queue {
  constructor() {
    this.items = [];
    this.start = 0;
  }

  push(value) {
    this.items.push(value);
  }

  pop() {
    return this.items[this.start++];
  }

  isEmpty() {
    return this.start === this.items.length;
  }
}

const visited = Array.from({ length: n }, () => Array(m).fill(Infinity));

function BFS(x1, y1, x2, y2) {
  const q = new Queue();
  q.push([x1, y1, 0]);
  visited[x1][y1] = 0;

  while (!q.isEmpty()) {
    const [x, y, moves] = q.pop();
    if (x === x2 && y === y2) {
      return moves;
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 1; j <= k; j++) {
        const nx = x + path[i][0] * j;
        const ny = y + path[i][1] * j;

        if (nx < 0 || nx >= n || ny < 0 || ny >= m || graph[nx][ny] === "#") {
          break;
        }

        if (visited[nx][ny] < moves + 1) break;

        if (visited[nx][ny] === Infinity) {
          visited[nx][ny] = moves + 1;
          q.push([nx, ny, moves + 1]);
        }
      }
    }
  }
  return -1;
}

console.log(BFS(x1 - 1, y1 - 1, x2 - 1, y2 - 1));