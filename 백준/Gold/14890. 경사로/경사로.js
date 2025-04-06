const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, l] = input.shift().split(" ").map(Number);
const graph = input.map((line) => line.split(" ").map(Number));

let answer = 0;

function row(i) {
  const visited = Array(n).fill(false);

  for (let j = 0; j < n - 1; j++) {
    const curr = graph[i][j];
    const next = graph[i][j + 1];

    if (curr === next) continue;

    if (curr - next === 1) {
      // 내려가는 경사로 (오른쪽으로)
      if (j + l >= n) return false;
      for (let k = 1; k <= l; k++) {
        if (graph[i][j + k] !== next || visited[j + k]) return false;
      }
      for (let k = 1; k <= l; k++) {
        visited[j + k] = true;
      }
    } else if (curr - next === -1) {
      // 올라가는 경사로 (왼쪽으로)
      if (j - l + 1 < 0) return false;
      for (let k = 0; k < l; k++) {
        if (graph[i][j - k] !== curr || visited[j - k]) return false;
      }
      for (let k = 0; k < l; k++) {
        visited[j - k] = true;
      }
    } else {
      return false;
    }
  }

  return true;
}

function col(i) {
  const visited = Array(n).fill(false);

  for (let j = 0; j < n - 1; j++) {
    const curr = graph[j][i];
    const next = graph[j + 1][i];

    if (curr === next) continue;

    if (curr - next === 1) {
      // 내려가는 경사로 (아래로)
      if (j + l >= n) return false;
      for (let k = 1; k <= l; k++) {
        if (graph[j + k][i] !== next || visited[j + k]) return false;
      }
      for (let k = 1; k <= l; k++) {
        visited[j + k] = true;
      }
    } else if (curr - next === -1) {
      // 올라가는 경사로 (위로)
      if (j - l + 1 < 0) return false;
      for (let k = 0; k < l; k++) {
        if (graph[j - k][i] !== curr || visited[j - k]) return false;
      }
      for (let k = 0; k < l; k++) {
        visited[j - k] = true;
      }
    } else {
      return false;
    }
  }

  return true;
}

for (let i = 0; i < n; i++) {
  if (row(i)) answer++;
  if (col(i)) answer++;
}

console.log(answer);