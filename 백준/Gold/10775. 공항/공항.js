const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const G = Number(input.shift());
const P = Number(input.shift());
const arr = [];
for (let i = 0; i < P; i++) {
  arr.push(Number(input[i]));
}

// 경로 압축
function findParent(x, parent) {
  if (parent[x] !== x) {
    parent[x] = findParent(parent[x], parent);
  }
  return parent[x];
}

function union(a, b, parent) {
  a = findParent(a, parent);
  b = findParent(b, parent);

  if (a < b) {
    parent[b] = a;
  } else {
    parent[a] = b;
  }
}

let answer = 0;
const parent = Array.from({ length: G + 1 }, (_, i) => i);

for (let i = 0; i < arr.length; i++) {
  const check = findParent(arr[i], parent);

  if (check <= 0) {
    break;
  } else {
    answer++;
    union(check, check - 1, parent);
  }
}

console.log(answer);