const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const arr = input[0].split(" ").map(Number);
let answer = Infinity;
let answerArr = [];
arr.sort((a, b) => a - b);

for (let i = 0; i < n; i++) {
  let [start, end] = [0, n - 1];
  const check = arr[i];
  while (start < end) {
    if (check === arr[start]) {
      start++;
      continue;
    } else if (check === arr[end]) {
      end--;
      continue;
    }

    let result = check + arr[start] + arr[end];

    if (result === 0) {
      answer = 0;
      answerArr = [check, arr[start], arr[end]];
      answerArr.sort((a, b) => a - b);
      console.log(answerArr.join(" "));
      process.exit(0);
    }

    if (Math.abs(result) < Math.abs(answer)) {
      answer = result;
      answerArr = [check, arr[start], arr[end]];
    }

    if (result < 0) {
      start++;
    } else {
      end--;
    }
  }
}
answerArr.sort((a, b) => a - b);
console.log(answerArr.join(" "));