const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, k] = input.shift().split(" ").map(Number);
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

for (let i = 0; i < n; i++) {
  graph.push(input[i].split(" ").map(Number));
  for (let j = 0; j < n; j++) {
    if (graph[i][j] !== 0) {
      q.push([graph[i][j], i, j, 0]);
    }
  }
}

q.items.sort((a, b) => a[0] - b[0]);

const [s, x, y] = input[n].split(" ").map(Number);

const path = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function BFS() {
  while (!q.isEmpty()) {
    const [value, x, y, time] = q.pop();
    if (time < s) {
      for (let i = 0; i < 4; i++) {
        const nx = x + path[i][0];
        const ny = y + path[i][1];

        if (0 <= nx && nx < n && 0 <= ny && ny < n && graph[nx][ny] === 0) {
          graph[nx][ny] = value;
          q.push([value, nx, ny, time + 1]);
        }
      }
    }
  }
}

BFS();

console.log(graph[x - 1][y - 1]);