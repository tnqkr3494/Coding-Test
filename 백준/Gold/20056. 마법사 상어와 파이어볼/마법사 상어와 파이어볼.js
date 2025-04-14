const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, m, t] = input.shift().split(" ").map(Number);

let graph = Array.from({ length: n }, () =>
  Array.from({ length: n }, () => [])
);

// 위치(r,c) => 1부터라 0으로 만들어야함, 질량(m), 방향(d), 속력(s)
let fireballs = [];
for (let i = 0; i < m; i++) {
  const [r, c, m, s, d] = input[i].split(" ").map(Number);
  fireballs.push([r - 1, c - 1, m, s, d]);
}

const path = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];

for (let _ = 0; _ < t; _++) {
  while (fireballs.length > 0) {
    const [r, c, m, s, d] = fireballs.pop();
    // 이동
    const nr = (((r + path[d][0] * s) % n) + n) % n;
    const nc = (((c + path[d][1] * s) % n) + n) % n;
    graph[nr][nc].push([m, s, d]);
  }

  // 이동 후 처리
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // 2 이상이면 합치기
      if (graph[i][j].length >= 2) {
        let [weight, speed, cnt, odd, even] = [0, 0, 0, 0, 0];
        while (graph[i][j].length > 0) {
          [w, s, d] = graph[i][j].pop();
          weight += w;
          speed += s;
          cnt++;
          if (d % 2 === 0) {
            even++;
          } else {
            odd++;
          }
        }
        // 다 합치면
        weight = Math.floor(weight / 5);
        speed = Math.floor(speed / cnt);
        let newPath = [];
        if (odd === cnt || even === cnt) {
          newPath = [0, 2, 4, 6];
        } else {
          newPath = [1, 3, 5, 7];
        }

        if (weight > 0) {
          // 새로운 파이어볼로 넣기
          for (let l = 0; l < 4; l++) {
            fireballs.push([i, j, weight, speed, newPath[l]]);
          }
        }
      } else if (graph[i][j].length === 1) {
        fireballs.push([i, j, ...graph[i][j].pop()]);
      }
    }
  }
}

let answer = 0;
for (let i = 0; i < fireballs.length; i++) {
  answer += fireballs[i][2];
}

console.log(answer);