const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const crain = input.shift().split(" ").map(Number);
const m = Number(input.shift());
const boxes = input.shift().split(" ").map(Number);
let time = 0;

crain.sort((a, b) => b - a);
boxes.sort((a, b) => b - a);

if (crain[0] < boxes[0]) {
  console.log(-1);
  process.exit(0);
}

while (boxes.length > 0) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (crain[i] >= boxes[j]) {
        boxes.splice(j, 1);
        break;
      }
    }
  }

  time++;
}

console.log(time);