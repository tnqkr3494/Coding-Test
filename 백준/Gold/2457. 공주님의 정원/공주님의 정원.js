const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const flowers = [];

for (let i = 0; i < n; i++) {
  flowers.push(input[i].split(" ").map(Number));
}

// 시작날짜 기준 정렬, 같으면 종료일 내림차순
flowers.sort(
  (a, b) => a[0] - b[0] || a[1] - b[1] || b[2] - a[2] || b[3] - a[3]
);

let nowM = 3,
  nowD = 1; // 현재 시점
let endM = 0,
  endD = 0; // 이번에 고른 꽃 중 가장 늦게 지는 시점
let idx = 0;
let answer = 0;

while (nowM < 12) {
  let found = false;

  while (idx < n) {
    const [startM, startD, finishM, finishD] = flowers[idx];

    // 시작일이 현재 시점보다 이후라면 반복 종료
    if (startM > nowM || (startM === nowM && startD > nowD)) break;

    // 해당 꽃이 현재 시점에서 피어 있고, 가장 늦게 지는 꽃인지 확인
    if (finishM > endM || (finishM === endM && finishD > endD)) {
      endM = finishM;
      endD = finishD;
      found = true;
    }

    idx++;
  }

  if (!found) {
    console.log(0);
    process.exit(0);
  }

  // 가장 늦게 지는 꽃을 선택
  nowM = endM;
  nowD = endD;
  answer++;
}

console.log(answer);