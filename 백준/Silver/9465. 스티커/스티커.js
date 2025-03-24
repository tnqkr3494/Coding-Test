const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const t = Number(input.shift());
const answer = [];

for (let _ = 0; _ < t; _++) {
  const n = Number(input.shift());
  const a = input.shift().split(" ").map(Number);
  const b = input.shift().split(" ").map(Number);

  const dp = [a, b];

  for (let i = 1; i < n; i++) {
    if (i >= 2) {
      dp[0][i] += Math.max(dp[1][i - 1], dp[1][i - 2]);
      dp[1][i] += Math.max(dp[0][i - 1], dp[0][i - 2]);
    } else {
      dp[0][i] += dp[1][i - 1];
      dp[1][i] += dp[0][i - 1];
    }
  }

  answer.push(Math.max(dp[0][n - 1], dp[1][n - 1]));
}

console.log(answer.join("\n"));