const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const arr = input[0].split(" ").map(Number);
const answer = Array(n).fill(-1);
const stack = [[arr[0], 0]];

for (i = 1; i < n; i++) {
  while (stack.length > 0 && stack[stack.length - 1][0] < arr[i]) {
    const [value, index] = stack.pop();
    answer[index] = arr[i];
  }
  stack.push([arr[i], i]);
}

console.log(answer.join(" "));