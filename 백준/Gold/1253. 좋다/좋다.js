const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);
let answer = 0;
arr.sort((a, b) => a - b);

for (let i = 0; i < n; i++) {
  const target = arr[i];
  let [start, end] = [0, n - 1];
  while (start < end) {
    if (start === i) {
      start++;
      continue;
    }
    if (end === i) {
      end--;
      continue;
    }

    const result = arr[start] + arr[end];

    if (result < target) {
      start++;
    } else if (result === target) {
      answer += 1;
      break;
    } else {
      end--;
    }
  }
}

console.log(answer);