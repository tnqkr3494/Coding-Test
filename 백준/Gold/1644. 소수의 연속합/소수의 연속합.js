const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const n = Number(require("fs").readFileSync(filePath).toString().trim());

const isPrime = Array.from({ length: n + 1 }, () => true);
const prime = [];

// 에라토스테네스 채
for (let i = 2; i < n + 1; i++) {
  if (isPrime[i]) {
    prime.push(i);
    for (let j = i + i; j < n + 1; j += i) {
      isPrime[j] = false;
    }
  }
}

let [start, end] = [0, 0];
let result = prime[start];
let answer = 0;

while (start <= end && end < prime.length) {
  if (result === n) {
    answer++;
    result -= prime[start];
    start++;
  } else if (result < n) {
    end++;
    result += prime[end];
  } else {
    result -= prime[start];
    start++;
  }
}

console.log(answer);