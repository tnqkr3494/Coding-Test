const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const graph = [];
const check = [];
let answer = Infinity;

for (let i = 0; i < n; i++) {
  graph.push(input[i].split(" ").map(Number));
  for (let j = 0; j < m; j++) {
    if (graph[i][j] >= 1 && graph[i][j] <= 5) {
      check.push([graph[i][j], i, j]);
    }
  }
}

const path = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const cctv = [
  [],
  [[0], [1], [2], [3]],
  [
    [0, 2],
    [1, 3],
  ],
  [
    [3, 0],
    [0, 1],
    [1, 2],
    [2, 3],
  ],
  [
    [2, 3, 0],
    [3, 0, 1],
    [0, 1, 2],
    [1, 2, 3],
  ],
  [[0, 1, 2, 3]],
];

function see(x, y, dir, graph) {
  for (let i = 0; i < dir.length; i++) {
    let [nx, ny] = [x, y];
    while (true) {
      nx += path[dir[i]][0];
      ny += path[dir[i]][1];
      if (0 <= nx && nx < n && 0 <= ny && ny < m && graph[nx][ny] !== 6) {
        graph[nx][ny] = "#";
      } else {
        break;
      }
    }
  }
  return graph;
}

function sol(depth, graph) {
  if (depth === check.length) {
    let cnt = 0;
    // 모든 CCTV의 경우의 수를 돌아보면 정답처리
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (graph[i][j] === 0) {
          cnt++;
        }
      }
    }
    answer = Math.min(answer, cnt);

    return;
  }

  const [num, x, y] = check[depth];

  for (let i = 0; i < cctv[num].length; i++) {
    // 탐색
    let tempGraph = graph.map((row) => [...row]);
    tempGraph = see(x, y, cctv[num][i], tempGraph);
    sol(depth + 1, tempGraph);
  }
}

sol(0, graph);
console.log(answer);