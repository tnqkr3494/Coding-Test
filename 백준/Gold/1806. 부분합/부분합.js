const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, s] = input.shift().split(" ").map(Number);
const arr = input[0].split(" ").map(Number);
let [start, end] = [0, 0];
let answer = Infinity;
let result = arr[0];

while (start <= end && end < n) {
  if (result >= s) {
    result -= arr[start];
    start++;
    answer = Math.min(answer, end - start + 2);
  } else {
    end++;
    result += arr[end];
  }
}

answer === Infinity ? console.log(0) : console.log(answer);