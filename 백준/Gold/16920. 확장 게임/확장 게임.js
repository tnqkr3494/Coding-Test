const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, m, p] = input.shift().split(" ").map(Number);
const move = input.shift().split(" ").map(Number);
const graph = [];
const castle = Array.from({ length: p }, () => 0);
for (let i = 0; i < n; i++) {
  graph.push(input[i].split(""));
}
// 여기서 숫자가 문자인걸 주의해야 함.

const path = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

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
  size() {
    return this.end - this.start;
  }
}

const player = Array.from({ length: p }, () => new Queue());

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (graph[i][j] !== "." && graph[i][j] !== "#") {
      castle[Number(graph[i][j] - 1)]++;
      player[Number(graph[i][j]) - 1].push([i, j]);
    }
  }
}

function BFS() {
  // 게임판이 전부 채워지기 전까지
  while (true) {
    let cnt = 0;
    for (let num = 0; num < p; num++) {
      // 플레이어 순서대로 뽑아서 BFS 돌려서 확장함.
      let q = player[num];

      for (let _ = 0; _ < move[num]; _++) {
        const temp = q.size();
        if (temp === 0) {
          break;
        }
        for (let k = 0; k < temp; k++) {
          const [x, y] = q.pop();

          for (let i = 0; i < 4; i++) {
            const nx = x + path[i][0];
            const ny = y + path[i][1];
            if (
              0 <= nx &&
              nx < n &&
              0 <= ny &&
              ny < m &&
              graph[nx][ny] === "."
            ) {
              cnt++;
              graph[nx][ny] = graph[x][y];
              castle[Number(graph[x][y]) - 1]++;
              q.push([nx, ny]);
            }
          }
        }
      }
    }

    if (cnt === 0) {
      break;
    }
  }
}

BFS();

console.log(castle.join(" "));