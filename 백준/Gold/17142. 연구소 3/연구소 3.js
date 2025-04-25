const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const graph = [];
const virus = [];
let answer = Infinity;
let zeroCnt = 0;

for (let i = 0; i < n; i++) {
  graph.push(input[i].split(" ").map(Number));
  for (let j = 0; j < n; j++) {
    if (graph[i][j] === 2) {
      virus.push([i, j]);
    } else if (graph[i][j] === 0) {
      zeroCnt++;
    }
  }
}

const combinations = [];
function combination(depth, result, start) {
  if (depth === m) {
    combinations.push([...result]);
    return;
  }

  for (let i = start; i < virus.length; i++) {
    result.push(virus[i]);
    combination(depth + 1, result, i + 1);
    result.pop();
  }
}

combination(0, [], 0);

// 이제 바이러스 퍼트리는 경우에 따라 BFS 돌려봄.
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

// 퍼지는 과정

const path = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
function BFS(arr) {
  const q = new Queue();
  const visited = Array.from({ length: n }, () => Array(n).fill(-1));
  // TODO: zeroCnt랑 비교해서 전부 퍼트리는지 확인
  let cnt = 0;
  let spreadTime = 0;

  arr.forEach((e) => {
    visited[e[0]][e[1]] = 0;
    q.push(e);
  });

  while (!q.isEmpty() && zeroCnt > cnt) {
    const [x, y] = q.pop();
    for (let i = 0; i < 4; i++) {
      const nx = x + path[i][0];
      const ny = y + path[i][1];

      if (
        0 <= nx &&
        nx < n &&
        0 <= ny &&
        ny < n &&
        graph[nx][ny] !== 1 &&
        visited[nx][ny] === -1
      ) {
        visited[nx][ny] = visited[x][y] + 1;
        spreadTime = Math.max(visited[nx][ny], spreadTime);
        q.push([nx, ny]);
        if (graph[nx][ny] === 0) {
          cnt++;
        }
      }
    }
  }

  if (cnt === zeroCnt) {
    // 모두 퍼뜨릴 수 있는 경우에만 answer 갱신
    answer = Math.min(answer, spreadTime);
  }
}

for (const arr of combinations) {
  BFS(arr);
}

answer === Infinity ? console.log(-1) : console.log(answer);