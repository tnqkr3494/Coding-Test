const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [a, b] = input;

const dp = Array.from({ length: a.length + 1 }, () =>
  Array(b.length + 1).fill(0)
);

for (let i = 1; i < a.length + 1; i++) {
  for (let j = 1; j < b.length + 1; j++) {
    if (a[i - 1] === b[j - 1]) {
      dp[i][j] = dp[i - 1][j - 1] + 1;
    } else {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
}

console.log(dp[a.length][b.length]);