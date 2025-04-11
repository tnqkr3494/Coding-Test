const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, m, k] = input.shift().split(" ").map(Number);
const minsu = input.shift().split(" ").map(Number);
const chulsu = input.shift().split(" ").map(Number);

function findParent(x, parent) {
  if (parent[x] !== x) {
    parent[x] = findParent(parent[x], parent);
  }

  return parent[x];
}

function union(x, y, parent) {
  const a = findParent(x, parent);
  const b = findParent(y, parent);

  parent[a] = b;
}

minsu.sort((a, b) => a - b);

function binarySearch(check) {
  let [start, end] = [0, m - 1];

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (minsu[mid] <= check) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return start;
}

const parent = Array.from({ length: m }, (_, i) => i);
const answer = [];

for (const e of chulsu) {
  const idx = binarySearch(e);
  // 경로 압축
  const realIdx = findParent(idx, parent);
  answer.push(minsu[realIdx]);

  if (idx < m - 1) {
    union(parent[realIdx], parent[realIdx + 1], parent);
  }
}

console.log(answer.join("\n"));