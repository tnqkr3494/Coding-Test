const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const m = Number(input.shift());
const check = [];
for (let i = 0; i < m; i++) {
  check.push(Number(input[i]));
}

// 바꿨을 때, 바꾸지 않았을 때, 왼쪽과 변경, 오른쪽과 변경
const dp = Array.from({ length: n + 1 }, () => 0);
// 첫번째 자리만 있을 때는 우선 1가지 경우밖에 없을 것
dp[0] = 1;
dp[1] = 1;
let temp = 0;

for (let i = 2; i < n + 1; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}

// 중간에 고정된 자리가 있으면...
let answer = 1;
if (m > 0) {
  let idx = 0;
  for (const fix of check) {
    answer *= dp[fix - 1 - idx];
    idx = fix;
  }
  answer *= dp[n - idx];
} else {
  answer = dp[n];
}

console.log(answer);