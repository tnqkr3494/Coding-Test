const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const a = input[0].split("");
const b = input[1].split("");

const dp = Array.from({ length: a.length + 1 }, () =>
  Array.from({ length: b.length + 1 }, () => [0, ""])
);

for (let i = 1; i <= a.length; i++) {
  for (let j = 1; j <= b.length; j++) {
    if (a[i - 1] === b[j - 1]) {
      dp[i][j] = [dp[i - 1][j - 1][0] + 1, dp[i - 1][j - 1][1] + a[i - 1]];
    } else {
      if (dp[i - 1][j][0] >= dp[i][j - 1][0]) {
        dp[i][j] = [dp[i - 1][j][0], dp[i - 1][j][1]];
      } else {
        dp[i][j] = [dp[i][j - 1][0], dp[i][j - 1][1]];
      }
    }
  }
}

console.log(dp[a.length][b.length].join("\n"));