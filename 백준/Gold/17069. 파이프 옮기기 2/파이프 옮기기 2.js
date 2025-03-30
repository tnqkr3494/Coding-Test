const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const graph = [];

for (let i = 1; i < input.length; i++) {
  graph.push(input[i].split(" ").map(Number));
}

const dp = Array.from({ length: n }, () =>
  Array.from({ length: n }, () => Array(3).fill(0))
);

// 0 : 가로, 1 : 세로, 2 : 대각

for (let i = 1; i < n; i++) {
  if (graph[0][i] === 0) {
    dp[0][i][0] = 1;
  } else {
    break;
  }
}

for (let i = 1; i < n; i++) {
  for (let j = 1; j < n; j++) {
    if (graph[i][j] === 0 && graph[i - 1][j] === 0 && graph[i][j - 1] === 0) {
      //대각선 조건 코드
      dp[i][j][2] +=
        dp[i - 1][j - 1][0] + dp[i - 1][j - 1][1] + dp[i - 1][j - 1][2];
    }
    if (graph[i][j] === 0) {
      dp[i][j][0] += dp[i][j - 1][0] + dp[i][j - 1][2];
      dp[i][j][1] += dp[i - 1][j][1] + dp[i - 1][j][2];
    }
  }
}

console.log(dp[n - 1][n - 1].reduce((acc, cur) => acc + cur, 0));