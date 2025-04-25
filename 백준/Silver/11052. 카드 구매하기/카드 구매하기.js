const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const arr = [0, ...input[0].split(" ").map(Number)];

const dp = Array.from({ length: n + 1 }, () => 0);

for (let i = 1; i < n + 1; i++) {
  for (let j = 1; j <= i; j++) {
    dp[i] = Math.max(dp[i], dp[i - j] + arr[j]);
  }
}

console.log(dp[n]);