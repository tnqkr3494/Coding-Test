const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const graph = Array.from({ length: n }, () => []);

for (let i = 0; i < m; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

function DFS(x, depth, visited) {
  if (depth === 5) {
    console.log(1);
    process.exit(0);
  }

  for (const friend of graph[x]) {
    if (!visited[friend]) {
      visited[friend] = true;
      DFS(friend, depth + 1, visited);
      visited[friend] = false;
    }
  }
}

for (let i = 0; i < n; i++) {
  const visited = Array.from({ length: n }, () => false);
  visited[i] = true;
  DFS(i, 1, visited);
}

console.log(0);