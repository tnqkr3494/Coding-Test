const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const arr = input.shift().split(" ").map(Number);
const m = Number(input.shift());
const question = [];
for (let i = 0; i < input.length; i++) {
  question.push(input[i].split(" ").map(Number));
}

const dp = Array.from({ length: n }, () =>
  Array.from({ length: n }, () => false)
);

// 한개
for (let i = 0; i < n; i++) {
  dp[i][i] = true;
}

// 두개
for (let i = 0; i < n - 1; i++) {
  if (arr[i] === arr[i + 1]) {
    dp[i][i + 1] = true;
  }
}

// 나머지부터는 시간복잡도가 기하급수적으로 증가해서 dp로 처리
// ex) 2 ~ 5    34가 이미 세팅되있음. 하지만 2, 5 한번더 살펴보긴 해야됨
// ex) 2 ~ 6    35가 세팅되어 있어야 함
for (let i = n - 3; i >= 0; i--) {
  for (let j = i + 2; j < n; j++) {
    if (arr[i] === arr[j] && dp[i + 1][j - 1]) {
      dp[i][j] = true;
    }
  }
}

const answer = [];
for (const [s, e] of question) {
  if (dp[s - 1][e - 1]) {
    answer.push(1);
  } else {
    answer.push(0);
  }
}

console.log(answer.join("\n"));