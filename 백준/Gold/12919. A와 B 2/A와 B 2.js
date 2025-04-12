const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const s = input[0];
const t = input[1].split("");

function sol(result) {
  if (s.length === result.length) {
    // 정답 비교 처리
    if (s === result.join("")) {
      console.log(1);
      process.exit(0);
    }
    return;
  }

  // 뒤에 A빼기
  if (result[result.length - 1] === "A") {
    result.pop();
    sol(result);
    result.push("A");
  }

  // 뒤집고 뒤에 빼기
  if (result[0] === "B") {
    result.reverse();
    result.pop();
    sol(result);
    result.push("B");
    result.reverse();
  }
}

sol(t);

console.log(0);