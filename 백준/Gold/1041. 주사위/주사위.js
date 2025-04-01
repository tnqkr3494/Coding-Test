const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);

let answer = 0;

if (n === 1) {
  arr.sort((a, b) => a - b);
  for (let i = 0; i < 5; i++) {
    answer += arr[i];
  }
} else {
  const check = [];

  check.push(Math.min(arr[0], arr[5]));
  check.push(Math.min(arr[1], arr[4]));
  check.push(Math.min(arr[2], arr[3]));

  check.sort((a, b) => a - b);

  answer =
    4 * (check[0] + check[1] + check[2]) +
    (4 * (n - 2) + 4 * (n - 1)) * (check[0] + check[1]) +
    (Math.pow(n - 2, 2) + 4 * (n - 1) * (n - 2)) * check[0];
}

console.log(answer);