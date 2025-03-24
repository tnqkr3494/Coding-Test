const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, c] = input.shift().split(" ").map(Number);

const arr = [];
for (let i = 0; i < n; i++) {
  arr.push(Number(input[i]));
}

arr.sort((a, b) => a - b);

let start = 0;
let end = arr[n - 1];

while (start <= end) {
  // mid : 최대거리 예측
  let mid = Math.floor((start + end) / 2);
  let flag = arr[0];
  let cnt = 1;
  for (let i = 1; i < n; i++) {
    if (arr[i] - flag >= mid) {
      flag = arr[i];
      cnt++;
    }
  }
  if (cnt >= c) {
    start = mid + 1;
    answer = mid;
  } else {
    end = mid - 1;
  }
}

console.log(answer);