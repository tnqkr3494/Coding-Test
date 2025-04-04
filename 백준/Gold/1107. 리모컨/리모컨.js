const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const m = Number(input.shift());
let buttons = [];
if (m > 0) {
  buttons = input[0].split(" ").map(Number);
}

let answer = Math.abs(n - 100); // +, -만 보고 가는 경우

for (let i = 0; i < 1000000; i++) {
  const str_i = String(i);
  let flag = true;

  for (let j = 0; j < str_i.length; j++) {
    if (buttons.includes(Number(str_i[j]))) {
      flag = false;
      break;
    }
  }
  if (flag) {
    answer = Math.min(answer, Math.abs(n - i) + str_i.length);
  }
}

console.log(answer);