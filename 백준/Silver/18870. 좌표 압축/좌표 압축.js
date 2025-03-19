const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = input.shift();
const arr = input.shift().split(" ").map(Number);
const setArr = new Set(arr);
const reArr = Array.from(setArr);
reArr.sort((a, b) => a - b);
const answer = [];

function binarySearch(reArr, target) {
  let start = 0;
  let end = reArr.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (reArr[mid] < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return start;
}

arr.forEach((e) => {
  answer.push(binarySearch(reArr, e));
});

console.log(answer.join(" "));