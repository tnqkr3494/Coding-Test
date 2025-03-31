const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const m = Number(input.shift());
const graph = [];

for (let i = 0; i < n; i++) {
  graph.push(input[i].split(" ").map(Number));
}

function findParent(x) {
  if (x !== parent[x]) {
    parent[x] = findParent(parent[x]);
  }
  return parent[x];
}
function union(x, y) {
  const a = findParent(x);
  const b = findParent(y);

  if (a < b) {
    parent[b] = a;
  } else {
    parent[a] = b;
  }
}

const parent = Array.from({ length: n + 1 }, (_, i) => i);

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (graph[i][j] === 1) {
      union(i + 1, j + 1);
    }
  }
}

const path = input[n].split(" ").map(Number);
let answer = "YES";

for (let i = 0; i < path.length - 1; i++) {
  if (findParent(path[i]) !== findParent(path[i + 1])) {
    answer = "NO";
    break;
  }
}

console.log(answer);