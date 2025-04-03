const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const t = Number(input.shift());
const answer = [];

function sol(x, visited, result, friend, arr) {
  if (visited[x]) {
    if (result.includes(x)) {
      friend.push(...result.slice(result.indexOf(x)));
    }
    return;
  }

  visited[x] = true;
  result.push(x);

  sol(arr[x] - 1, visited, result, friend, arr);
}

for (let _ = 0; _ < t; _++) {
  const n = Number(input.shift());
  const arr = input.shift().split(" ").map(Number);
  const visited = Array.from({ length: n }, () => false);
  const friend = [];
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      sol(i, visited, [], friend, arr);
    }
  }

  answer.push(n - friend.length);
}

console.log(answer.join("\n"));