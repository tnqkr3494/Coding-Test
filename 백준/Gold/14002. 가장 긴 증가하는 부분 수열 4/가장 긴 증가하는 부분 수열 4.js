const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");
const n = Number(input.shift());
const arr = input[0].split(" ").map(Number);
const dp = [arr[0]];
const record = Array(n).fill(0);

function binarySearch(start, end, target, ls) {
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (ls[mid] < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return start;
}

for (let i = 1; i < n; i++) {
  const target = arr[i];

  if (dp[dp.length - 1] < target) {
    dp.push(target);
    record[i] = dp.length - 1;
  } else {
    const idx = binarySearch(0, dp.length, target, dp);
    dp[idx] = target;
    record[i] = idx;
  }
}

let check = dp.length - 1;
const answer = [];
for (let i = record.length - 1; i >= 0; i--) {
  if (check === record[i]) {
    answer.push(arr[i]);
    check--;
  }
}

console.log(dp.length + "\n" + answer.reverse().join(" "));