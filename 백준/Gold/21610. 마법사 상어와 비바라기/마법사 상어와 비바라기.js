const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const graph = [];
const order = [];
const mod = (x, m) => ((x % m) + m) % m;

for (let i = 0; i < n; i++) {
  graph.push(input[i].split(" ").map(Number));
}

for (let i = n; i < input.length; i++) {
  order.push(input[i].split(" ").map(Number));
}

const path = [
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
];

let cloud = [
  [n - 1, 0],
  [n - 1, 1],
  [n - 2, 0],
  [n - 2, 1],
];

// 구름 이동 및 물양 증가
function move(cloud, graph, d, s) {
  const newCloud = [];
  const visited = new Set();

  for (const [x, y] of cloud) {
    const nx = mod(x + path[d - 1][0] * s, n);
    const ny = mod(y + path[d - 1][1] * s, n);

    graph[nx][ny] += 1;
    newCloud.push([nx, ny]);
    visited.add(`${nx},${ny}`);
  }

  return { newCloud, visited };
}

// 물 복사 버그
function duplicate(cloud, graph) {
  const cross = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  for (const [x, y] of cloud) {
    let cnt = 0;
    for (const [dx, dy] of cross) {
      const nx = x + dx,
        ny = y + dy;
      if (nx >= 0 && nx < n && ny >= 0 && ny < n && graph[nx][ny] > 0) {
        cnt++;
      }
    }
    graph[x][y] += cnt;
  }
}

// 새로운 구름 생성
function generate(graph, visited) {
  const newCloud = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (graph[i][j] >= 2 && !visited.has(`${i},${j}`)) {
        graph[i][j] -= 2;
        newCloud.push([i, j]);
      }
    }
  }

  return newCloud;
}

for (const [d, s] of order) {
  const { newCloud, visited } = move(cloud, graph, d, s);
  duplicate(newCloud, graph);
  cloud = generate(graph, visited);
}

const answer = graph.flat().reduce((acc, val) => acc + val, 0);
console.log(answer);