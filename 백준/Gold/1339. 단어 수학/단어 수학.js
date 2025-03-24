const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const dic = {};
let answer = 0;

for (let i = 0; i < input.length; i++) {
  const arr = input[i].split("");

  for (let j = 0; j < arr.length; j++) {
    if (arr[j] in dic) {
      dic[arr[j]] += 10 ** (arr.length - j - 1);
    } else {
      dic[arr[j]] = 10 ** (arr.length - j - 1);
    }
  }
}

const sorted = Object.entries(dic).sort((a, b) => b[1] - a[1]);
let num = 9;
for (const [_, value] of sorted) {
  answer += value * num;
  num--;
}

console.log(answer);