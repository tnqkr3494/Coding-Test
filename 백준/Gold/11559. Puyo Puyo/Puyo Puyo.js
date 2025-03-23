const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const graph = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((e) => e.split(""));

let answer = 0;

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

function BFS(x, y, visited) {
  const q = new Queue();
  const check = graph[x][y];
  const temp = [];
  visited[x][y] = true;
  q.push([x, y]);
  temp.push([x, y]);

  while (!q.isEmpty()) {
    const [x, y] = q.pop();
    for (let i = 0; i < 4; i++) {
      const nx = x + path[i][0];
      const ny = y + path[i][1];

      if (
        0 <= nx &&
        nx < 12 &&
        0 <= ny &&
        ny < 6 &&
        !visited[nx][ny] &&
        graph[nx][ny] === check
      ) {
        visited[nx][ny] = true;
        q.push([nx, ny]);
        temp.push([nx, ny]);
      }
    }
  }

  return temp;
}

function bomb(temp) {
  for (const [x, y] of temp) {
    graph[x][y] = ".";
  }
}

function down() {
  for (let i = 0; i < 6; i++) {
    let bottom = 11;
    for (let j = 10; j >= 0; j--) {
      if (graph[j][i] !== ".") {
        if (graph[bottom][i] === ".") {
          graph[bottom][i] = graph[j][i];
          graph[j][i] = ".";
          bottom--;
        } else {
          bottom--;
          if (graph[bottom][i] === ".") {
            graph[bottom][i] = graph[j][i];
            graph[j][i] = ".";
            bottom--;
          }
        }
      }
    }
  }
}

while (true) {
  const visited = Array.from({ length: 12 }, () => Array(6).fill(false));
  let flag = false;
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 6; j++) {
      if (graph[i][j] !== "." && !visited[i][j]) {
        const temp = BFS(i, j, visited);
        if (temp.length >= 4) {
          //터트린 후 로직
          bomb(temp);
          flag = true;
        }
      }
    }
  }
  if (flag) {
    answer += 1;
    // 한번에 터지고 다같이 내려와야함.
    down();
  } else {
    console.log(answer);
    break;
  }
}