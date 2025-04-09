const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const arr = input[0].split(" ").map(Number);
const dp = [arr[0]];

function binarySearch(dp, check) {
  let [start, end] = [0, dp.length - 1];

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (dp[mid] < check) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return start;
}

let answer = 1;
for (let i = 1; i < n; i++) {
  const check = arr[i];

  if (dp[dp.length - 1] < check) {
    dp.push(check);
  } else {
    let index = binarySearch(dp, check);
    dp[index] = check;
  }
  answer = Math.max(answer, dp.length);
}

console.log(answer);