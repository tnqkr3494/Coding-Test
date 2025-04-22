const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const arr = [];

for (let i = 0; i < n; i++) {
  arr.push(input[i].split(" ").map(Number));
}

const dp = Array.from({ length: n + 2 }, () => 0);

for (let i = 1; i <= n; i++) {
  dp[i] = Math.max(dp[i], dp[i - 1]);
  if (i + arr[i - 1][0] <= n + 1) {
    // 상담 가능할 때 미리 체크
    dp[i + arr[i - 1][0]] = Math.max(
      dp[i + arr[i - 1][0]],
      dp[i] + arr[i - 1][1]
    );
  }
}
console.log(Math.max(...dp));