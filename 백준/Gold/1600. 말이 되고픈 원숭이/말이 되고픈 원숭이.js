const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const k = Number(input.shift());
const [w, h] = input.shift().split(" ").map(Number);
const graph = [];

for (let i = 0; i < h; i++) {
  graph.push(input[i].split(" ").map(Number));
}

const visited = Array.from({ length: h }, () =>
  Array.from({ length: w }, () => Array(k + 1).fill(-1))
);

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
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const horsePath = [
  [-2, 1],
  [-2, -1],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [1, 2],
  [-1, 2],
];

function BFS() {
  visited[0][0][0] = 0;
  const q = new Queue();
  q.push([0, 0, 0]);

  while (!q.isEmpty()) {
    const [x, y, horse] = q.pop();

    if (x === h - 1 && y === w - 1) {
      return visited[x][y][horse];
    }

    // 아직 k값 보다 horse가 작으면 말처럼 움직이는 것도 가능
    if (horse < k) {
      for (let i = 0; i < 8; i++) {
        const nx = x + horsePath[i][0];
        const ny = y + horsePath[i][1];

        if (
          0 <= nx &&
          nx < h &&
          0 <= ny &&
          ny < w &&
          visited[nx][ny][horse + 1] === -1 &&
          graph[nx][ny] === 0
        ) {
          visited[nx][ny][horse + 1] = visited[x][y][horse] + 1;
          q.push([nx, ny, horse + 1]);
        }
      }
    }

    // 만약 horse값이 k가 넘으면 더이상 말처럼 움직일 수 없음
    for (let i = 0; i < 4; i++) {
      const nx = x + path[i][0];
      const ny = y + path[i][1];

      if (
        0 <= nx &&
        nx < h &&
        0 <= ny &&
        ny < w &&
        visited[nx][ny][horse] === -1 &&
        graph[nx][ny] === 0
      ) {
        visited[nx][ny][horse] = visited[x][y][horse] + 1;
        q.push([nx, ny, horse]);
      }
    }
  }

  return -1;
}

console.log(BFS());