const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const n = Number(require("fs").readFileSync(filePath).toString().trim());

const dp = Array.from({ length: n + 1 }, () => Array(10).fill(0));
for (let i = 0; i < 10; i++) {
  dp[1][i] = 1;
}

for (let i = 2; i <= n; i++) {
  for (let j = 0; j < 10; j++) {
    if (j === 0) {
      dp[i][j] = 1;
    } else {
      dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % 10007;
    }
  }
}

console.log(dp[n].reduce((acc, cur) => acc + cur) % 10007);