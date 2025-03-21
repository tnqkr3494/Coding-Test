const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");
const [n, m] = input.shift().split(" ").map(Number);
let graph = [];
let time = 0;
let cnt = 0;

for (let i = 0; i < input.length; i++) {
  graph.push(input[i].split(" ").map(Number));
  for (let j = 0; j < input[i].length; j++) {
    if (graph[i][j] === 1) {
      cnt += 1;
    }
  }
}

class Queue {
  items = [];
  start = 0;
  end = 0;

  push(item) {
    this.items.push(item);
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

function BFS() {
  const queue = new Queue();
  const visited = Array.from({ length: n }, () => Array(m).fill(0));
  const temp = [];
  queue.push([0, 0]);

  visited[0][0] = 5;

  while (!queue.isEmpty()) {
    const [x, y] = queue.pop();

    for (let i = 0; i < path.length; i++) {
      nx = x + path[i][0];
      ny = y + path[i][1];

      if (0 <= nx && nx < n && 0 <= ny && ny < m && visited[nx][ny] < 5) {
        if (graph[nx][ny] === 0) {
          visited[nx][ny] = 5;
          queue.push([nx, ny]);
        } else {
          visited[nx][ny] += 1;
          if (visited[nx][ny] == 2) {
            visited[nx][ny] = 5;
            temp.push([nx, ny]);
          }
        }
      }
    }
    for (const [x, y] of temp) {
      graph[x][y] = 0;
    }
  }

  return temp.length;
}

while (true) {
  time += 1;
  cnt -= BFS();

  if (cnt === 0) {
    console.log(time);
    break;
  }
}