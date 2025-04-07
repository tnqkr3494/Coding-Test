const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const graph = [];

for (let i = 0; i < input.length; i++) {
  graph.push(input[i].split(" ").map(Number));
}

let dp = Array.from({ length: n }, () => Array.from({ length: 3 }, () => 0));
let answer = Infinity;

for (let i = 0; i < 3; i++) {
  dp[0] = [Infinity, Infinity, Infinity];
  dp[0][i] = graph[0][i];
  for (let j = 1; j < n; j++) {
    dp[j][0] = Math.min(dp[j - 1][1], dp[j - 1][2]) + graph[j][0];
    dp[j][1] = Math.min(dp[j - 1][0], dp[j - 1][2]) + graph[j][1];
    dp[j][2] = Math.min(dp[j - 1][0], dp[j - 1][1]) + graph[j][2];
  }
  dp[n - 1][i] = Infinity;

  answer = Math.min(answer, ...dp[n - 1]);
}

console.log(answer);