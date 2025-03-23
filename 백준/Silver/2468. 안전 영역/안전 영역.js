const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const graph = [];
let max_value = -1;
let answer = 0;

for (let i = 0; i < n; i++) {
  graph.push(input[i].split(" ").map(Number));
  for (let j = 0; j < n; j++) {
    max_value = Math.max(max_value, Number(input[i][j]));
  }
}

const path = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function DFS(x, y, check, visited) {
  for (let i = 0; i < 4; i++) {
    const nx = x + path[i][0];
    const ny = y + path[i][1];

    if (
      0 <= nx &&
      nx < n &&
      0 <= ny &&
      ny < n &&
      graph[nx][ny] > check &&
      !visited[nx][ny]
    ) {
      visited[nx][ny] = true;
      DFS(nx, ny, check, visited);
    }
  }
}

for (let i = 0; i <= 100; i++) {
  const visited = Array.from({ length: n }, () => Array(n).fill(false));
  let result = 0;
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < n; k++) {
      if (graph[j][k] > i && !visited[j][k]) {
        visited[j][k] = true;
        DFS(j, k, i, visited);
        result += 1;
      }
    }
  }
  answer = Math.max(answer, result);
}

console.log(answer);