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

arr.sort((a, b) => a[0] - b[0]);

// LIS로 풀면 되는데 문제는 dp로 풀면 n^2이라 안됨.
const dp = [arr[0]];
const record = [0];

function binarySearch(dp, check) {
  let [start, end] = [0, dp.length - 1];

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (dp[mid][1] < check) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return start;
}

for (let i = 1; i < n; i++) {
  const check = arr[i];
  if (check[1] > dp[dp.length - 1][1]) {
    dp.push(check);
    record.push(dp.length - 1);
  } else {
    const idx = binarySearch(dp, check[1]);
    dp[idx] = check;
    record.push(idx);
  }
}

const answer = [];

let recordCheck = Math.max(...record);
for (let i = record.length - 1; i >= 0; i--) {
  if (record[i] === recordCheck) {
    recordCheck -= 1;
  } else {
    answer.push(arr[i][0]);
  }
}

console.log(n - dp.length);
if (answer.length > 0) {
  answer.sort((a, b) => a - b);
  console.log(answer.join("\n"));
}