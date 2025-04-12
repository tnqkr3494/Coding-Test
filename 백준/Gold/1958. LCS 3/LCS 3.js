const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const a = input[0].split("");
a.unshift("A");
const b = input[1].split("");
b.unshift("B");
const c = input[2].split("");
c.unshift("C");

const dp = Array.from({ length: a.length }, () =>
  Array.from({ length: b.length }, () => Array(c.length).fill(0))
);

for (let i = 1; i < a.length; i++) {
  for (let j = 1; j < b.length; j++) {
    for (let k = 1; k < c.length; k++) {
      if (a[i] === b[j] && a[i] === c[k]) {
        dp[i][j][k] = dp[i - 1][j - 1][k - 1] + 1;
      } else {
        dp[i][j][k] = Math.max(
          dp[i - 1][j][k],
          dp[i][j - 1][k],
          dp[i][j][k - 1]
        );
      }
    }
  }
}

console.log(dp[a.length - 1][b.length - 1][c.length - 1]);