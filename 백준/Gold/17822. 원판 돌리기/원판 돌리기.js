const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, m, t] = input.shift().split(" ").map(Number);
const graph = [];
for (let i = 0; i < n; i++) {
  graph.push(input.shift().split(" ").map(Number));
}

const order = [];

for (let i = 0; i < t; i++) {
  order.push(input.shift().split(" ").map(Number));
}

// 돌리는 로직
function turn(x, d, k) {
  let count = k % m;
  while (count > 0) {
    count--;
    if (d === 0) {
      graph[x].unshift(graph[x].pop());
    } else {
      graph[x].push(graph[x].shift());
    }
  }
}

// 인접한 부분 체크하는 로직
function check() {
  const temp = Array.from({ length: n }, () => Array(m).fill(false));
  let result = 0;
  let avg = 0;
  let cnt = 0;
  let flag = false;

  // 같은 원판 내부에서 동일한게 있는지 확인
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (graph[i][j] === graph[i][(j + 1) % m] && graph[i][j] !== 0) {
        temp[i][j] = true;
        temp[i][(j + 1) % m] = true;
      }
    }
  }

  // 다른 원판과 인접한 부분
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n - 1; j++) {
      if (graph[j][i] === graph[j + 1][i] && graph[j][i] !== 0) {
        temp[j][i] = true;
        temp[j + 1][i] = true;
      }
    }
  }

  // 인접해서 동일하면 전부 0으로
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (temp[i][j]) {
        graph[i][j] = 0;
        flag = true;
      } else if (graph[i][j] !== 0) {
        result += graph[i][j];
        cnt++;
      }
    }
  }
  if (!flag) {
    if (cnt === 0) return; // 안전 처리
    avg = result / cnt;
    plus(avg);
  }
}

function plus(avg) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (graph[i][j] !== 0) {
        if (graph[i][j] > avg) {
          graph[i][j] -= 1;
        } else if (graph[i][j] < avg) {
          graph[i][j] += 1;
        }
      }
    }
  }
}

for (const [x, d, k] of order) {
  for (let i = 0; i < n; i++) {
    if ((i + 1) % x === 0) {
      turn(i, d, k);
    }
  }
  check();
}

console.log(graph.flat().reduce((acc, cur) => acc + cur));