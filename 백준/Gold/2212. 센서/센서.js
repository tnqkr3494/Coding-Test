const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const k = Number(input.shift());
const arr = input[0].split(" ").map(Number);
arr.sort((a, b) => a - b);
const check = [];

if (k === 1) {
  console.log(arr[arr.length - 1] - arr[0]);
} else {
  for (let i = 1; i < arr.length; i++) {
    check.push(arr[i] - arr[i - 1]);
  }
  check.sort((a, b) => a - b);
  for (let i = 0; i < k - 1; i++) {
    check.pop();
  }
  console.log(check.reduce((acc, cur) => acc + cur, 0));
}