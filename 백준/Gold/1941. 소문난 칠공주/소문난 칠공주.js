const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const graph = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((e) => e.split(""));

// 이다솜 S,임도연 Y

// BFS로 돌리면 되긴하는데,,, 중복이 너무 많이 발생한다.
const check = [];
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    check.push([i, j]);
  }
}

const combinations = [];
function combination(check, start, depth, result) {
  if (depth === 7) {
    combinations.push([...result]);
    return;
  }

  for (let i = start; i < 25; i++) {
    result.push(check[i]);
    combination(check, i + 1, depth + 1, result);
    result.pop();
  }
}
combination(check, 0, 0, []);

class Queue {
  items = [];
  start = 0;
  end = 0;

  push(value) {
    this.items.push(value);
    this.end++;
  }
  pop() {
    return this.items[this.start++];
  }
  isEmpty() {
    return this.start === this.end;
  }
}

const path = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function seven(arr) {
  let cnt = 0;
  for (const [x, y] of arr) {
    if (graph[x][y] === "S") {
      cnt++;
    }
  }

  return cnt >= 4;
}

function BFS(arr, a, b) {
  const visited = Array.from({ length: 5 }, () => Array(5).fill(false));

  const q = new Queue();
  visited[a][b] = true;
  q.push([a, b]);

  while (!q.isEmpty()) {
    const [x, y] = q.pop();
    for (let i = 0; i < 4; i++) {
      const nx = x + path[i][0];
      const ny = y + path[i][1];

      if (
        0 <= nx &&
        nx < 5 &&
        0 <= ny &&
        ny < 5 &&
        !visited[nx][ny] &&
        arr.some((item) => item[0] === nx && item[1] === ny)
      ) {
        q.push([nx, ny]);
        visited[nx][ny] = true;
      }
    }
  }

  if (q.items.length === 7) {
    return seven(q.items);
  } else {
    return false;
  }
}

let answer = 0;
for (const arr of combinations) {
  BFS(arr, arr[0][0], arr[0][1]) ? answer++ : null;
}
console.log(answer);