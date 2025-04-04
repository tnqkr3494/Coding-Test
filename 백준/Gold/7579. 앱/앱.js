const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const memory = input.shift().split(" ").map(Number);
const cost = input.shift().split(" ").map(Number);
const sumCost = cost.reduce((acc, cur) => acc + cur, 0);
const dp = Array.from({ length: n + 1 }, () => Array(sumCost + 1).fill(0));
let answer = Infinity;

for (let i = 1; i <= n; i++) {
  for (let j = 0; j <= sumCost; j++) {
    if (j >= cost[i - 1]) {
      dp[i][j] = Math.max(
        dp[i - 1][j],
        dp[i - 1][j - cost[i - 1]] + memory[i - 1]
      );
    } else {
      dp[i][j] = dp[i - 1][j];
    }

    if (dp[i][j] >= m) {
      answer = Math.min(answer, j);
    }
  }
}

console.log(answer);