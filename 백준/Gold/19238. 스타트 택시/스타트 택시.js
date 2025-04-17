const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

let [n, m, fuel] = input.shift().split(" ").map(Number);
const graph = [[]];
for (let i = 0; i < n; i++) {
  graph.push([0, ...input.shift().split(" ").map(Number)]);
}

let [taxiX, taxiY] = input.shift().split(" ").map(Number);

let passengers = [];
for (let i = 0; i < m; i++) {
  passengers.push(input.shift().split(" ").map(Number));
}

// 거리, 행, 열

class Queue {
  itmes = [];
  start = 0;
  end = 0;

  push(value) {
    this.itmes.push(value);
    this.end++;
  }
  pop() {
    return this.itmes[this.start++];
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

function sol() {
  // 손님 결정 후 손님으로 이동

  const [startX, startY, endX, endY, dist] = select(passengers, taxiX, taxiY);
  if (dist === -1) {
    console.log(-1);
    process.exit(0);
  }

  fuel -= dist;

  if (fuel < 0) {
    console.log(-1);
    process.exit(0);
  }

  [taxiX, taxiY] = [startX, startY];

  // 손님 ~ 목적지 이동 후 택시 위치 교체
  const last = findDistance(taxiX, taxiY);

  if (last[endX][endY] === -1) {
    console.log(-1);
    process.exit(0);
  }

  fuel -= last[endX][endY];
  if (fuel < 0) {
    console.log(-1);
    process.exit(0);
  }
  fuel += last[endX][endY] * 2;

  [taxiX, taxiY] = [endX, endY];
}

// 첫번째로 방문할 손님 결정
function select(passengers, taxiX, taxiY) {
  const dist = findDistance(taxiX, taxiY);
  passengers.sort(
    (a, b) => dist[b[0]][b[1]] - dist[a[0]][a[1]] || b[0] - a[0] || b[1] - a[1]
  );

  const [startX, startY, endX, endY] = passengers.pop();

  return [startX, startY, endX, endY, dist[startX][startY]];
}

function findDistance(a, b) {
  const q = new Queue();
  const visited = Array.from({ length: n + 1 }, () => Array(n + 1).fill(-1));
  q.push([a, b]);
  visited[a][b] = 0;

  while (!q.isEmpty()) {
    const [x, y] = q.pop();
    for (let i = 0; i < 4; i++) {
      const nx = x + path[i][0];
      const ny = y + path[i][1];

      if (
        0 < nx &&
        nx < n + 1 &&
        0 < ny &&
        ny < n + 1 &&
        visited[nx][ny] === -1 &&
        graph[nx][ny] === 0
      ) {
        visited[nx][ny] = visited[x][y] + 1;
        q.push([nx, ny]);
      }
    }
  }

  return visited;
}

while (passengers.length > 0) {
  sol();
}

console.log(fuel);