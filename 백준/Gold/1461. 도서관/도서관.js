const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const arr = input[0].split(" ").map(Number);

const plus = arr.filter((x) => x > 0).sort((a, b) => b - a);
const minus = arr.filter((x) => x < 0).sort((a, b) => a - b); // 음수는 오름차순

let distances = [];

// 각 그룹 중 가장 먼 책의 위치를 저장
for (let i = 0; i < plus.length; i += m) {
  distances.push(plus[i]);
}
for (let i = 0; i < minus.length; i += m) {
  distances.push(-minus[i]); // 절대값
}

// 가장 먼 거리만 단방향으로, 나머지는 왕복
const maxDist = Math.max(...distances);
let answer = distances.reduce((sum, d) => sum + d * 2, 0);
answer -= maxDist;

console.log(answer);