const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const graph = [];
let answer = Infinity;

for (let i = 0; i < n; i++) {
  graph.push(input[i].split(" ").map(Number));
}

const total = graph.flat().reduce((acc, cur) => acc + cur);

// 인구수 구하기
function population(x, y, d1, d2) {
  const count = Array(5).fill(0);
  const visited = Array.from({ length: n }, () => Array(n).fill(false));

  // 5번 경계선
  for (let i = 0; i <= d1; i++) {
    visited[x + i][y - i] = true;
    visited[x + d2 + i][y + d2 - i] = true;
  }
  for (let i = 0; i <= d2; i++) {
    visited[x + i][y + i] = true;
    visited[x + d1 + i][y - d1 + i] = true;
  }

  // 5번 내부 채우기
  for (let i = x + 1; i < x + d1 + d2; i++) {
    let flag = false;
    for (let j = 0; j < n; j++) {
      if (visited[i][j]) flag = !flag;
      if (flag) {
        visited[i][j] = true;
      }
    }
  }

  // 나머지 구역
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (visited[i][j]) {
        count[4] += graph[i][j];
      } else {
        if (i < x + d1 && j <= y) {
          count[0] += graph[i][j];
        }
        if (i <= x + d2 && y < j) {
          count[1] += graph[i][j];
        }
        if (x + d1 <= i && j < y - d1 + d2) {
          count[2] += graph[i][j];
        }
        if (x + d2 < i && y - d1 + d2 <= j) {
          count[3] += graph[i][j];
        }
      }
    }
  }

  return Math.max(...count) - Math.min(...count);
}

// 런천미트 막갈겨
for (let x = 0; x < n; x++) {
  for (let y = 0; y < n; y++) {
    for (let d1 = 1; d1 < n; d1++) {
      for (let d2 = 1; d2 < n; d2++) {
        // 뽀또 개레전드 방송
        if (0 <= x && x + d1 + d2 < n && 0 <= y - d1 && y + d2 < n) {
          answer = Math.min(answer, population(x, y, d1, d2));
        }
      }
    }
  }
}

console.log(answer);