const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const [r, c, d] = input.shift().split(" ").map(Number);
const graph = [];
for (let i = 0; i < input.length; i++) {
  graph.push(input[i].split(" ").map(Number));
}
let answer = 0;

const path = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function sol(r, c, d) {
  while (true) {
    let flag = false;
    if (graph[r][c] === 0) {
      graph[r][c] = 2;
      answer += 1;
    }

    for (let i = 1; i <= 4; i++) {
      const nd = (d - i + 4) % 4; // 반시계 방향으로 회전
      const nr = r + path[nd][0];
      const nc = c + path[nd][1];

      if (graph[nr][nc] === 0) {
        r = nr;
        c = nc;
        d = nd;
        flag = true;
        break;
      }
    }
    // 청소되지 않은 빈칸이 없는 경우
    if (!flag) {
      let nr = r - path[d][0];
      let nc = c - path[d][1];
      if (graph[nr][nc] === 1) {
        return;
      } else {
        r = nr;
        c = nc;
      }
    }
  }
}

sol(r, c, d);
console.log(answer);