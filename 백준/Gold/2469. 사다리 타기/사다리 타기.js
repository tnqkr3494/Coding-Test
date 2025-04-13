const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const k = Number(input.shift());
const n = Number(input.shift());
let end = input.shift().split("");
let start = [...end].sort();
const ladders = [];
let firstLadders = [];
let endLadders = [];

for (let i = 0; i < n; i++) {
  ladders.push(input[i].split(""));
}

for (let i = 0; i < n; i++) {
  if (ladders[i][0] === "?") {
    firstLadders = ladders.slice(0, i);
    endLadders = ladders.slice(i + 1);
  }
}

// 사다리 타는 로직
function move(ladders, result) {
  for (let i = 0; i < ladders.length; i++) {
    // 가로는 k - 1개까지만 존재한다. 왜냐하면 마지막 사다리에는 오른쪽으로 다리를 놓을 수 없기 때문
    for (let j = 0; j < k - 1; j++) {
      if (ladders[i][j] === "-") {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
      }
    }
  }
}

move(firstLadders, start);

endLadders.reverse();
move(endLadders, end);

const answer = [];
for (let i = 0; i < k - 1; i++) {
  if (start[i] === end[i]) {
    answer.push("*");
  } else {
    // 바로 옆에 값과 동일하면
    if (start[i] === end[i + 1]) {
      answer.push("-");
    } else if (answer[answer.length - 1] === "-") {
      answer.push("*");
    } else {
      // 아예 안되는 경우
      console.log("x".repeat(k - 1));
      process.exit(0);
    }
  }
}

console.log(answer.join(""));