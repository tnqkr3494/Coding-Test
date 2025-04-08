const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const arr = input[0].split(" ").map(Number);
arr.sort((a, b) => a - b);
const plus = [];
const minus = [];
let maxPlus = -1;
let maxMinus = -1;

// 가장 먼곳 제외하고 거꾸로 탐색해서 더해주기

for (const e of arr) {
  if (e < 0) {
    minus.push(e);
    maxMinus = Math.max(-e, maxMinus);
  } else {
    plus.push(e);
    maxPlus = Math.max(e, maxPlus);
  }
}

let answer = 0;

if (maxMinus < maxPlus) {
  for (let i = 0; i < minus.length; i += m) {
    answer += -minus[i] * 2;
  }
  for (let i = plus.length - m - 1; i >= 0; i -= m) {
    answer += plus[i] * 2;
  }
  answer += plus[plus.length - 1];
} else {
  for (let i = m; i < minus.length; i += m) {
    answer += -minus[i] * 2;
  }
  for (let i = plus.length - 1; i >= 0; i -= m) {
    answer += plus[i] * 2;
  }

  answer += -minus[0];
}
console.log(answer);