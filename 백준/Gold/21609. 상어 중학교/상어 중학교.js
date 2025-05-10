const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

// 검정(-1), 무지개(0), 일반 m 개의 색
const [n, m] = input.shift().split(" ").map(Number);

// n * n
let graph = [];
let group = [];
let answer = 0;

for (let i = 0; i < n; i++) {
  graph.push(input[i].split(" ").map(Number));
}

const path = [
  [1, 0],
  [-1, 0],
  [0, 1],
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

  isEmpty() {
    return this.start === this.end;
  }
}

// 그룹 찾는 로직
function BFS(x, y, visited) {
  const q = new Queue();
  const check = graph[x][y];
  const result = [];
  const rainbow = [];
  q.push([x, y]);
  result.push([x, y]);
  visited[x][y] = true;

  while (!q.isEmpty()) {
    const [x, y] = q.pop();
    for (let i = 0; i < 4; i++) {
      const nx = x + path[i][0];
      const ny = y + path[i][1];

      if (0 <= nx && nx < n && 0 <= ny && ny < n) {
        // 무지개 블록 혹은 같은 일반블록 색일 때
        if (
          (graph[nx][ny] === 0 || graph[nx][ny] === check) &&
          !visited[nx][ny]
        ) {
          q.push([nx, ny]);
          result.push([nx, ny]);
          visited[nx][ny] = true;

          if (graph[nx][ny] === 0) {
            rainbow.push([nx, ny]);
          }
        }
      }
    }
  }
  // 이렇게 만들어진 그룹의 블록 수를 계산해야 함. 또한 기준 블록도 따로 저장해야함.
  if (result.length >= 2) {
    // 기준 블록, 지금까지 그룹핑 된 블록의 좌표도 넣기
    group.push([result.length, rainbow.length, ...result]);
  }

  for (const [x, y] of rainbow) {
    visited[x][y] = false;
  }
}

// 가장 큰 블록 그룹 찾아 제거하고 점수
function removeAndCalculate(group) {
  group.sort(
    (a, b) =>
      b[0] - a[0] || b[1] - a[1] || b[2][0] - a[2][0] || b[2][1] - a[2][1]
  );

  for (let i = 2; i < group[0].length; i++) {
    const [x, y] = group[0][i];
    graph[x][y] = -2;
  }

  answer += group[0][0] ** 2;
}

// 중력(뿌요뿌요) 아 개빡이네
function gravity(graph) {
  // 검정은 움직이지 못함

  for (let i = 0; i < n; i++) {
    let bottom = -1;
    for (let j = n - 1; j >= 0; j--) {
      // 빈 칸, 검은 칸이 아닐 경우
      if (graph[j][i] >= 0 && bottom !== -1) {
        graph[bottom][i] = graph[j][i];
        graph[j][i] = -2;
        bottom -= 1;
      } else if (graph[j][i] === -1) {
        bottom = -1;
      }
      // 빈 칸이면
      else if (graph[j][i] === -2 && bottom === -1) {
        bottom = j;
      }
    }
  }
}

// 반시계 회전
function transpose(graph) {
  return graph[0].map((_, col) => graph.map((row) => row[col]));
}

function rotate(graph) {
  return transpose(graph).reverse();
}

// 블록 그룹이 존재하는 동안

while (true) {
  const visited = Array.from({ length: n }, () => Array(n).fill(false));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j] && graph[i][j] >= 1) {
        BFS(i, j, visited);
      }
    }
  }

  //그룹핑이 될 텐데...
  if (group.length === 0) {
    break;
  }

  // 제거 및 점수 계산
  removeAndCalculate(group);
  group = [];

  // 중력
  gravity(graph);

  // 반시계
  graph = rotate(graph);

  // 중력
  gravity(graph);
}

console.log(answer);