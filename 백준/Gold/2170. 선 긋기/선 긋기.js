const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const arr = [];
for (let i = 0; i < n; i++) {
  arr.push(input[i].split(" ").map(Number));
}

arr.sort((a, b) => a[0] - b[0]);
// 정렬을 했기 때문에 다음 초기 위치가 기존 초기 위치보다 앞에 가는 경우는 없을 거임

let [start, end] = arr[0];
let answer = 0;

for (let i = 1; i < n; i++) {
  const [nextStart, nextEnd] = arr[i];

  // 밖으로 나가면
  if (nextStart > end) {
    answer += end - start;
    start = nextStart;
    end = nextEnd;
  }
  // 중간에 들어가는데 end는 밖으로 가버리면
  else if (nextStart <= end && nextEnd > end) {
    end = nextEnd;
  }
}

answer += end - start;
console.log(answer);