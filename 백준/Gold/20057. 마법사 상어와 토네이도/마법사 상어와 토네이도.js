const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const graph = [];
for (let i = 0; i < n; i++) {
  graph.push(input[i].split(" ").map(Number));
}

// 회전에 규칙에 주목
// 1 1, 2 2, 3 3,  .... => 마지막에 n만큼 가려고할 때 범위를 벗어나는 값이 나올것
let [startX, startY] = [Math.floor(n / 2), Math.floor(n / 2)];
// 비율로 흩날리는 값 위치 전부 저장
const portions = [
  [1, 1, 0.01],
  [-1, 1, 0.01],
  [-2, 0, 0.02],
  [2, 0, 0.02],
  [0, -2, 0.05],
  [-1, -1, 0.1],
  [1, -1, 0.1],
  [-1, 0, 0.07],
  [1, 0, 0.07],
  [0, -1, 0],
];
const sand = {
  0: portions,
  1: portions.map((e) => [-e[1], e[0], e[2]]),
  2: portions.map((e) => [e[0], -e[1], e[2]]),
  3: portions.map((e) => [e[1], -e[0], e[2]]),
};

let answer = 0;
let dir = 0;

const path = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

function move(x, y, dir, count) {
  for (let i = 0; i < count; i++) {
    x += path[dir][0];
    y += path[dir][1];
    if (0 <= x && x < n && 0 <= y && y < n) {
      // dir에 따라 portion을 수정해야한다. 그 후 모래 계산
      let total = 0;
      for (const portion of sand[dir]) {
        const [sx, sy, calc] = portion;
        const nx = x + sx;
        const ny = y + sy;

        // 그래프 안에 들어오면 그냥 모래 추가
        if (0 <= nx && nx < n && 0 <= ny && ny < n) {
          if (calc !== 0) {
            graph[nx][ny] += Math.floor(graph[x][y] * calc);
          } else {
            graph[nx][ny] += graph[x][y] - total;
          }
        } else {
          if (calc !== 0) {
            answer += Math.floor(graph[x][y] * calc);
          } else {
            answer += graph[x][y] - total;
          }
        }
        total += Math.floor(graph[x][y] * calc);
      }
    } else {
      // 만약 토네이도가 넘어가버리는 경우가 생기면 끝
      console.log(answer);
      process.exit(0);
    }
  }

  return [x, y];
}

function sol() {
  for (let i = 1; i <= n; i++) {
    // 같은 이동량(i)이 2번씩 총 n번 나옴. (마지막 제외하고)
    [startX, startY] = move(startX, startY, dir, i);
    dir = (dir + 1) % 4;
    [startX, startY] = move(startX, startY, dir, i);
    dir = (dir + 1) % 4;
  }
}

sol();