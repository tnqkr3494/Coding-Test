const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const graph = [];
const check = [];

for (let i = 0; i < input.length; i++) {
  graph.push(input[i].split("").map(Number));
  for (let j = 0; j < graph[i].length; j++) {
    // 0먼저 따로 챙겨놓기
    if (graph[i][j] === 0) {
      check.push([i, j]);
    }
  }
}

// 가로 확인
function row(num, value) {
  for (let i = 0; i < 9; i++) {
    if (graph[num][i] === value) {
      return false;
    }
  }
  return true;
}

// 세로 확인
function col(num, value) {
  for (let i = 0; i < 9; i++) {
    if (graph[i][num] === value) {
      return false;
    }
  }
  return true;
}

// 3*3 확인
function three(x, y, value) {
  for (let i = Math.floor(x / 3) * 3; i < Math.floor(x / 3) * 3 + 3; i++) {
    for (let j = Math.floor(y / 3) * 3; j < Math.floor(y / 3) * 3 + 3; j++) {
      if (graph[i][j] === value) {
        return false;
      }
    }
  }
  return true;
}

function sol(depth) {
  // 0을 전부 채울 수 있으면 정답 도출
  if (depth === check.length) {
    console.log(graph.map((e) => e.join("")).join("\n"));
    process.exit(0);
  }

  const [x, y] = check[depth];
  for (let i = 1; i < 10; i++) {
    // 조건에 부합하는 경우면 경우의 수 탐색 시작
    if (row(x, i) && col(y, i) && three(x, y, i)) {
      graph[x][y] = i;
      sol(depth + 1);
      graph[x][y] = 0;
    }
  }
}

sol(0);