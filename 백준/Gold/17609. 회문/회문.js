const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");
const [n, ...arr] = input;
const answer = [];

function isPalindrome(str, left, right) {
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}

function sol(ch) {
  let start = 0;
  let end = ch.length - 1;

  while (start < end) {
    if (ch[start] === ch[end]) {
      start++;
      end--;
    } else {
      // 왼쪽 문자 제거 후 회문 검사
      if (isPalindrome(ch, start + 1, end)) return 1;

      // 오른쪽 문자 제거 후 회문 검사
      if (isPalindrome(ch, start, end - 1)) return 1;

      return 2;
    }
  }
  return 0;
}

for (const element of arr) {
  answer.push(sol(element));
}

console.log(answer.join("\n"));