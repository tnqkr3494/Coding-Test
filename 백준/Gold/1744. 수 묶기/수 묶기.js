const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
let answer = 0;

const plus = [];
const minus = [];

for (let i = 0; i < n; i++) {
  const num = Number(input[i]);
  if (num > 0) {
    plus.push(num);
  } else {
    minus.push(num);
  }
}

plus.sort((a, b) => b - a);
minus.sort((a, b) => a - b);

for (let i = 0; i < plus.length; i += 2) {
  if (i + 1 < plus.length) {
    if (plus[i] === 1 || plus[i + 1] === 1) {
      answer += plus[i] + plus[i + 1];
    } else {
      answer += plus[i] * plus[i + 1];
    }
  } else if (i === plus.length - 1) {
    answer += plus[i];
  }
}

for (let i = 0; i < minus.length; i += 2) {
  if (i + 1 < minus.length) {
    answer += minus[i] * minus[i + 1];
  } else if (i === minus.length - 1) {
    answer += minus[i];
  }
}

console.log(answer);