const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const graph = [];
let year = 0;

for (let i = 0; i < n; i++) {
  graph.push(input[i].split(" ").map(Number));
}

const path = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

// 녹이는 함수
function melt() {
  const temp = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (graph[i][j] > 0) {
        let cnt = 0;
        for (let k = 0; k < 4; k++) {
          const ni = i + path[k][0];
          const nj = j + path[k][1];
          // 얼마나 녹는지 확인
          if (0 <= ni && ni < n && 0 <= nj && nj <= m && graph[ni][nj] === 0) {
            cnt++;
          }
        }
        temp.push([i, j, cnt]);
      }
    }
  }

  for (const [x, y, cnt] of temp) {
    graph[x][y] = Math.max(graph[x][y] - cnt, 0);
  }
}

function DFS(x, y, visited) {
  visited[x][y] = true;
  for (let i = 0; i < 4; i++) {
    const nx = x + path[i][0];
    const ny = y + path[i][1];
    if (
      0 <= nx &&
      nx < n &&
      0 <= ny &&
      ny < m &&
      graph[nx][ny] > 0 &&
      !visited[nx][ny]
    ) {
      DFS(nx, ny, visited);
    }
  }
}

// 빙산 두 덩어리 이상인지 확인
function check() {
  const visited = Array.from({ length: n }, () => Array(m).fill(false));
  let cnt = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (graph[i][j] > 0 && !visited[i][j]) {
        cnt++;
        DFS(i, j, visited);
      }
    }
  }

  return cnt;
}

while (true) {
  year++;
  melt();
  let cnt = check();
  if (cnt === 0) {
    year = 0;
    break;
  } else if (cnt >= 2) {
    break;
  }
}

console.log(year);