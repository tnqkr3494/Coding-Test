const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const n = Number(require("fs").readFileSync(filePath).toString().trim());

const dp = Array.from({ length: n + 1 }, () => 0);

if (n >= 2) {
  dp[2] = 3;
}

for (let i = 4; i <= n; i += 2) {
  dp[i] = dp[i - 2] * 3 + 2;
  for (let j = 4; j < i; j += 2) {
    dp[i] += dp[i - j] * 2;
  }
}

console.log(dp[n]);