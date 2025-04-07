const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const curves = [];
const graph = Array.from({ length: 101 }, () => Array(101).fill(false));

for (let i = 0; i < n; i++) {
  curves.push(input[i].split(" ").map(Number));
}

const path = [
  [0, 1],
  [-1, 0],
  [0, -1],
  [1, 0],
];

function dragon(curves, graph) {
  for (let [y, x, d, g] of curves) {
    const stack = [d];
    graph[x][y] = true;

    for (let i = 0; i < g; i++) {
      // 세대가 지나면 돌리기
      for (let j = stack.length - 1; j >= 0; j--) {
        stack.push((stack[j] + 1) % 4);
      }
    }
    for (let i = 0; i < stack.length; i++) {
      x += path[stack[i]][0];
      y += path[stack[i]][1];

      graph[x][y] = true;
    }
  }
}

dragon(curves, graph);

let answer = 0;
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    if (
      graph[i][j] &&
      graph[i][j + 1] &&
      graph[i + 1][j] &&
      graph[i + 1][j + 1]
    ) {
      answer++;
    }
  }
}

console.log(answer);