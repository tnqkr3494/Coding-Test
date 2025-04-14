const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input[[0]]);
const arr = input[1].split(" ").map(Number);
arr.sort((a, b) => a - b);

let [start, end] = [0, n - 1];

let answer = Infinity;
let answerList = [0, n - 1];

while (start < end) {
  const result = arr[start] + arr[end];
  const check = Math.abs(result);

  if (check === 0) {
    console.log(arr[start], arr[end]);
    process.exit(0);
  }

  if (answer > check) {
    answer = check;
    answerList = [start, end];
  }

  if (result > 0) {
    end--;
  } else {
    start++;
  }
}

console.log(arr[answerList[0]], arr[answerList[1]]);