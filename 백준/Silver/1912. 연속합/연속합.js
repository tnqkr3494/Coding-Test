const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const arr = input[0].split(" ").map(Number);
// 투 포인터는 안됨. 정렬되있지도 않고 투 포인터 쓰는 문제가 아님
// 그럼 dp 써야대네
const dp = [...arr];

for (let i = 1; i < n; i++) {
  dp[i] = Math.max(arr[i], dp[i - 1] + arr[i]);
}

console.log(Math.max(...dp));