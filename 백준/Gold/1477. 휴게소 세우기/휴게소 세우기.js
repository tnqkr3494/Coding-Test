const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, m, l] = input.shift().split(" ").map(Number);
let arr = [0, l];
if (n > 0) {
  arr = [0, ...input[0].split(" ").map(Number), l];
}

let answer = Infinity;
arr.sort((a, b) => a - b);
let [start, end] = [0, l - 1];

while (start <= end) {
  const mid = Math.floor((start + end) / 2);

  // mid값이 우리가 구할 정답
  let cnt = 0;
  for (let i = 1; i < arr.length; i++) {
    const check = arr[i] - arr[i - 1];
    const result = Math.ceil(check / mid - 1);
    cnt += result;
  }

  // 만약 휴게소를 더 세워야 한다면 => 값을 키워야됨.
  if (cnt > m) {
    start = mid + 1;
  } else {
    answer = Math.min(answer, mid);
    end = mid - 1;
  }
}

console.log(answer);