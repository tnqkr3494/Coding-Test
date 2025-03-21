const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);
arr = input.shift().split(" ").map(Number);
let answer = 0;

arr.sort((a, b) => a - b);
let start = 0;
let end = arr[arr.length - 1];

while (start <= end) {
  let mid = Math.floor((start + end) / 2);
  let result = 0;

  arr.forEach((e) => {
    if (e - mid > 0) {
      result += e - mid;
    }
  });

  if (result < m) {
    end = mid - 1;
  } else {
    start = mid + 1;
    answer = mid;
  }
}

console.log(answer);