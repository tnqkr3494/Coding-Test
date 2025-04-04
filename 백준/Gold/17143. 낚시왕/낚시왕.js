const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [r, c, m] = input.shift().split(" ").map(Number);
let answer = 0;

// 그래프 초기화: 각 칸에 상어 정보 [s, d, z] 저장
let graph = Array.from({ length: r }, () =>
  Array.from({ length: c }, () => null)
);

// 상어 정보 입력
for (let i = 0; i < m; i++) {
  let [sr, sc, s, d, z] = input[i].split(" ").map(Number);
  graph[sr - 1][sc - 1] = [s, d - 1, z]; // 방향 0-indexed
}

// 방향: 상, 하, 우, 좌
const path = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

// 가장 가까운 상어 잡기
function search(col) {
  for (let i = 0; i < r; i++) {
    if (graph[i][col]) {
      answer += graph[i][col][2]; // 크기 더하기
      graph[i][col] = null; // 상어 제거
      break;
    }
  }
}

// 상어 이동 + 먹기 로직 병합
function move() {
  const newGraph = Array.from({ length: r }, () =>
    Array.from({ length: c }, () => null)
  );

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (graph[i][j]) {
        let [s, d, z] = graph[i][j];
        let [x, y] = [i, j];

        // 속도 최적화
        let speed = d < 2 ? s % ((r - 1) * 2) : s % ((c - 1) * 2);

        while (speed--) {
          let nx = x + path[d][0];
          let ny = y + path[d][1];

          if (nx < 0 || nx >= r || ny < 0 || ny >= c) {
            d ^= 1; // 방향 반대로
            nx = x + path[d][0];
            ny = y + path[d][1];
          }

          x = nx;
          y = ny;
        }

        // 기존 상어보다 크면 덮어쓰기
        if (!newGraph[x][y] || newGraph[x][y][2] < z) {
          newGraph[x][y] = [s, d, z];
        }
      }
    }
  }

  graph = newGraph;
}

// 시뮬레이션 시작
for (let col = 0; col < c; col++) {
  search(col); // 상어 잡기
  move(); // 상어 이동 및 잡아먹기
}

console.log(answer);