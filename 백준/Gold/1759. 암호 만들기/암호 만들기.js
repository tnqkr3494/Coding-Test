const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);

const arr = input.shift().split(" ");
let answer = [];

arr.sort((a, b) => a.localeCompare(b));

function check(arr) {
  const checkList = ["a", "e", "i", "o", "u"];
  let result = 0;

  for (let i = 0; i < arr.length; i++) {
    for (const e of checkList) {
      if (arr[i] === e) {
        result += 1;
        break;
      }
    }
  }

  if (result >= 1 && arr.length - result >= 2) {
    return true;
  }
  return false;
}

function sol(depth, result) {
  if (depth === n) {
    // 조건 체크
    if (check(result)) {
      answer.push(result.join(""));
    }
    return;
  }

  for (let i = 0; i < m; i++) {
    if (result[result.length - 1] < arr[i] || result.length === 0) {
      result.push(arr[i]);
      sol(depth + 1, result);
      result.pop();
    }
  }
}

sol(0, []);

console.log(answer.join("\n"));