const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, m, h] = input.shift().split(" ").map(Number);
const ladders = [];
const graph = Array.from({ length: h }, () =>
  Array.from({ length: n }, () => false)
);
for (let i = 0; i < m; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  graph[a - 1][b - 1] = true;
}

// i -> i 체크(재귀돌때마다 매번 체크 => 시간초과날듯?)
function check() {
  for (let i = 0; i < n; i++) {
    let idx = i;
    for (let j = 0; j < h; j++) {
      if (graph[j][idx]) {
        // 사다리가 있으면
        idx++;
      } else if (idx > 0 && graph[j][idx - 1]) {
        idx--;
      }
    }

    if (idx !== i) {
      return false;
    }
  }
  return true;
}
let answer = Infinity;
// 사다리 놓는 위치 재귀
function sol(depth, x, y) {
  if (check()) {
    answer = Math.min(answer, depth);
    return;
  } else if (depth >= 3) {
    return;
  }
  if (y >= n - 1) {
    x += 1;
    y = 0;
  }
  for (let i = x; i < h; i++) {
    for (let j = y; j < n - 1; j++) {
      if (j === 0) {
        if (!graph[i][j] && !graph[i][j + 1]) {
          graph[i][j] = true;
          sol(depth + 1, x, y + 1);
          graph[i][j] = false;
        }
      } else {
        if (!graph[i][j] && !graph[i][j + 1] && !graph[i][j - 1]) {
          graph[i][j] = true;
          sol(depth + 1, x, y + 1);
          graph[i][j] = false;
        }
      }
    }
  }
}

sol(0, 0, 0);

console.log(answer === Infinity ? -1 : answer);