const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const arr = input[0].split(" ").map(Number);
arr.sort((a, b) => a - b);

let start = 0;
let end = n - 1;
let answer = Infinity;
let answer_arr = [0, 0];

while (start < end) {
  let result = Math.abs(arr[start] + arr[end]);
  if (answer > result) {
    answer = result;
    answer_arr[0] = arr[start];
    answer_arr[1] = arr[end];
  }
  if (result === 0) {
    break;
  }

  if (arr[start] + arr[end] > 0) {
    end--;
  } else {
    start++;
  }
}

console.log(answer_arr.join(" "));