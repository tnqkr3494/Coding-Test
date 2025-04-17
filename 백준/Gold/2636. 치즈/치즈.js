const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);

const graph = [];
for (let i = 0; i < n; i++) {
  graph.push(input[i].split(" ").map(Number));
}

// 동시성 문제 + [0,0]에서 살펴봐야 바깥쪽 접촉 확인가능.

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

let [time, cheeze] = [0, 0];

const path = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function BFS() {
  const q = new Queue();
  const visited = Array.from({ length: n }, () => Array(m).fill(false));
  q.push([0, 0]);
  visited[0][0] = true;
  const melt = [];

  while (!q.isEmpty()) {
    const [x, y] = q.pop();
    for (let i = 0; i < 4; i++) {
      const nx = x + path[i][0];
      const ny = y + path[i][1];
      if (0 <= nx && nx < n && 0 <= ny && ny < m && !visited[nx][ny]) {
        visited[nx][ny] = true;
        if (graph[nx][ny] === 1) {
          melt.push([nx, ny]);
        } else {
          q.push([nx, ny]);
        }
      }
    }
  }

  // 동시성 해결
  for (const [x, y] of melt) {
    graph[x][y] = 0;
  }

  if (melt.length > 0) {
    cheeze = melt.length;
    return true;
  } else {
    return false;
  }
}

while (true) {
  const check = BFS();
  if (!check) {
    break;
  }
  time++;
}
console.log(time + "\n" + cheeze);