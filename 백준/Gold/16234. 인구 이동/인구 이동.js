const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, l, r] = input.shift().split(" ").map(Number);
const graph = [];
let answer = 0;

for (let i = 0; i < input.length; i++) {
  graph.push(input[i].split(" ").map(Number));
}

class Queue {
  items = [];
  start = 0;
  end = 0;

  push(value) {
    this.items.push(value);
    this.end++;
  }
  pop() {
    return this.items[this.start++];
  }
  isEmpty() {
    return this.start === this.end;
  }
}

const path = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function BFS(x, y, visited, check) {
  const q = new Queue();
  let result = 0;
  const temp = [];
  q.push([x, y]);
  temp.push([x, y]);
  visited[x][y] = true;
  result += graph[x][y];

  while (!q.isEmpty()) {
    const [x, y] = q.pop();
    for (let i = 0; i < 4; i++) {
      const nx = x + path[i][0];
      const ny = y + path[i][1];
      if (0 <= nx && nx < n && 0 <= ny && ny < n && !visited[nx][ny]) {
        const check = Math.abs(graph[x][y] - graph[nx][ny]);
        if (l <= check && check <= r) {
          q.push([nx, ny]);
          temp.push([nx, ny]);
          visited[nx][ny] = true;
          result += graph[nx][ny];
        }
      }
    }
  }
  // 열린 곳 전부 계산해서 갱신
  result = Math.trunc(result / temp.length);

  for (const [x, y] of temp) {
    graph[x][y] = result;
  }
  return temp.length > 1;
}

while (true) {
  const visited = Array.from({ length: n }, () => Array(n).fill(false));
  let check = false;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j]) {
        if (BFS(i, j, visited)) {
          check = true;
        }
      }
    }
  }
  if (!check) {
    break;
  } else {
    answer += 1;
  }
}

console.log(answer);