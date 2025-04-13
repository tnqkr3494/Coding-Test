const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());

function sol(depth, arr, num, answer) {
  if (depth === num + 1) {
    const temp = arr.replaceAll(" ", "");
    if (eval(temp) === 0) {
      answer.push(arr);
    }
    return;
  }

  sol(depth + 1, arr + " " + String(depth), num, answer);
  sol(depth + 1, arr + "+" + String(depth), num, answer);
  sol(depth + 1, arr + "-" + String(depth), num, answer);
}

for (let i = 0; i < n; i++) {
  const num = Number(input[i]);
  const answer = [];
  const arr = "1";
  sol(2, arr, num, answer);
  console.log(answer.join("\n"));
  if (i < n - 1) {
    console.log();
  }
}