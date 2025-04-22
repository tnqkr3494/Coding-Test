const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
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

for (let i = 0; i < n; i++) {
  graph.push(input[i].split(" ").map(Number));
}

const path = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function DFS(x, y, num, visited) {
  visited[x][y] = true;
  graph[x][y] = num;

  for (let i = 0; i < 4; i++) {
    const nx = x + path[i][0];
    const ny = y + path[i][1];
    if (
      0 <= nx &&
      nx < n &&
      0 <= ny &&
      ny < n &&
      !visited[nx][ny] &&
      graph[nx][ny] === 1
    ) {
      DFS(nx, ny, num, visited);
    }
  }
}

// 섬별로 라벨링
let land = 2;
const visited = Array.from({ length: n }, () => Array(n).fill(false));
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (graph[i][j] === 1 && !visited[i][j]) {
      DFS(i, j, land, visited);
      land++;
    }
  }
}

// 짧은 다리 탐색
function BFS(num) {
  const q = new Queue();
  const visited = Array.from({ length: n }, () => Array(n).fill(-1));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (graph[i][j] === num) {
        q.push([i, j]);
        visited[i][j] = 0;
      }
    }
  }

  while (!q.isEmpty()) {
    const [x, y] = q.pop();

    if (graph[x][y] >= 2 && graph[x][y] !== num) {
      return visited[x][y];
    }

    for (let i = 0; i < 4; i++) {
      const nx = x + path[i][0];
      const ny = y + path[i][1];
      if (0 <= nx && nx < n && 0 <= ny && ny < n && visited[nx][ny] === -1) {
        visited[nx][ny] = visited[x][y] + 1;
        q.push([nx, ny]);
      }
    }
  }

  // 사실 이런 경우는 없음
  return -1;
}

let answer = Infinity;
for (let i = 2; i < land; i++) {
  answer = Math.min(answer, BFS(i));
}

console.log(answer - 1);