const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const answer = [];

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

function BFS(startX, startY, w, h, graph) {
  const q = new Queue();
  const visited = Array.from({ length: h }, () => Array(w).fill(-1));
  q.push([startX, startY]);
  visited[startX][startY] = 0;

  while (!q.isEmpty()) {
    const [x, y] = q.pop();

    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + path[i][0], y + path[i][1]];

      if (
        0 <= nx &&
        nx < h &&
        0 <= ny &&
        ny < w &&
        graph[nx][ny] !== "x" &&
        visited[nx][ny] === -1
      ) {
        q.push([nx, ny]);
        visited[nx][ny] = visited[x][y] + 1;
      }
    }
  }

  return visited;
}

while (true) {
  const [w, h] = input.shift().split(" ").map(Number);
  if (w === 0 && h === 0) break;

  const graph = [];
  const dust = [];
  let [startX, startY] = [0, 0];

  for (let i = 0; i < h; i++) {
    graph.push(input.shift().split(""));
    for (let j = 0; j < w; j++) {
      if (graph[i][j] === "*") {
        dust.push([i, j]);
      } else if (graph[i][j] === "o") {
        [startX, startY] = [i, j];
      }
    }
  }

  const points = [[startX, startY], ...dust];
  const distMap = Array.from({ length: points.length }, () =>
    Array(points.length).fill(Infinity)
  );

  // 거리 미리 계산
  for (let i = 0; i < points.length; i++) {
    const [sx, sy] = points[i];
    const visited = BFS(sx, sy, w, h, graph);
    for (let j = 0; j < points.length; j++) {
      const [ex, ey] = points[j];
      const d = visited[ex][ey];
      if (d === -1) distMap[i][j] = Infinity;
      else distMap[i][j] = d;
    }
  }

  // 청소 불가능한 경우
  let impossible = false;
  outer: for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points.length; j++) {
      if (distMap[i][j] === Infinity) {
        answer.push(-1);
        impossible = true;
        break outer;
      }
    }
  }

  if (impossible) continue;

  let finalResult = Infinity;

  function dfs(depth, visited, prevIdx, cost) {
    if (cost >= finalResult) return; // 가지치기

    if (depth === dust.length) {
      finalResult = Math.min(finalResult, cost);
      return;
    }

    for (let i = 0; i < dust.length; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      const nextIdx = i + 1; // dust는 points[1]부터 시작
      dfs(depth + 1, visited, nextIdx, cost + distMap[prevIdx][nextIdx]);
      visited[i] = false;
    }
  }

  dfs(0, Array(dust.length).fill(false), 0, 0);
  answer.push(finalResult);
}

console.log(answer.join("\n"));