const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const t = Number(input.shift());
const n = Number(input.shift());
const a = input.shift().split(" ").map(Number);
const m = Number(input.shift());
const b = input.shift().split(" ").map(Number);

const sumA = [];
const sumB = [];

// 누적합으로 경우의 수 구하기
for (let i = 0; i < n; i++) {
  let temp = a[i];
  sumA.push(temp);
  for (let j = i + 1; j < n; j++) {
    temp += a[j];
    sumA.push(temp);
  }
}

for (let i = 0; i < m; i++) {
  let temp = b[i];
  sumB.push(temp);
  for (let j = i + 1; j < m; j++) {
    temp += b[j];
    sumB.push(temp);
  }
}

function binarySearch(check) {
  let [start, end] = [0, sumB.length - 1];

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (sumB[mid] < check) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return start;
}

function binarySearch(check, dir) {
  let [start, end] = [0, sumB.length - 1];

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    // 0 이면 bisect right, 1이면 bisect left
    if (dir === 0 ? sumB[mid] <= check : sumB[mid] < check) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return start;
}

sumB.sort((a, b) => a - b);

let answer = 0;

for (let i = 0; i < sumA.length; i++) {
  const check = t - sumA[i];
  answer += binarySearch(check, 0) - binarySearch(check, 1);
}

console.log(answer);