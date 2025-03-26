const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const arr = input.map((line) => line.split(" ").map(Number));

arr.sort((a, b) => a[0] - b[0]);

const maxHeap = [];
let answer = 0;
let index = arr.length - 1;

for (let day = n; day > 0; day--) {
  while (index >= 0 && arr[index][0] >= day) {
    maxHeap.push(arr[index][1]);
    maxHeap.sort((a, b) => b - a);
    index--;
  }
  if (maxHeap.length > 0) {
    answer += maxHeap.shift();
  }
}

console.log(answer);