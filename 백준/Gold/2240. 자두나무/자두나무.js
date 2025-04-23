const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [t, w] = input.shift().split(" ").map(Number);
const arr = input.map(Number);
const dp = Array.from({ length: t }, () => Array(w + 1).fill(0));
[dp[0][0], dp[0][1]] = [arr[0] % 2, Math.floor(arr[0] / 2)];

for (let i = 1; i < t; i++) {
  for (let j = 0; j < w + 1; j++) {
    let temp = 0;
    // j는 이동 횟수
    if (j % 2 === 0) {
      // 위치가 1일때
      temp = arr[i] % 2;
    } else {
      // 위치가 2일때
      temp = Math.floor(arr[i] / 2);
    }
    dp[i][j] = Math.max(...dp[i - 1].slice(0, j + 1)) + temp;
  }
}

console.log(Math.max(...dp[t - 1]));