const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

let answer = Infinity;
const n = Number(input.shift());
const population = input.shift().split(" ").map(Number);
const graph = [];
for (let i = 0; i < n; i++) {
  // 0번째 인덱스는 구역 수, 나머지는 인접해 있는 구역
  graph.push(input[i].split(" ").map(Number));
}

// BFS로 해당 조합이 가능한지 check
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

function BFS(arr) {
  let cnt = 0;
  const q = new Queue();
  const visited = new Set();
  q.push(arr[0]);
  visited.add(arr[0]);

  while (!q.isEmpty()) {
    const x = q.pop();
    cnt += population[x];
    // 인접한 곳 모두 확인
    for (let i = 1; i < graph[x].length; i++) {
      const nx = graph[x][i] - 1;
      if (!visited.has(nx) && arr.includes(nx)) {
        q.push(nx);
        visited.add(nx);
      }
    }
  }

  if (visited.size === arr.length) {
    // 가능하니까 인구수 출력
    return cnt;
  } else {
    return -1;
  }
}

// 조합을 통해 경우의 수 분석
// count는 A 선거구에 포함될 경우의 수
function sol(depth, count, visited) {
  if (depth === count) {
    // 조합 구하기(지금까지 visited로 들어온 것이 A 선거구)
    const A = [];
    const B = [];

    for (let i = 0; i < n; i++) {
      if (visited.has(i)) {
        A.push(i);
      } else {
        B.push(i);
      }
    }

    // BFS돌려서 가능한 경우인지 체크 => 두 선거구 인구 수 차이 => 최솟값 비교
    const [checkA, checkB] = [BFS(A), BFS(B)];

    if (checkA !== -1 && checkB !== -1) {
      answer = Math.min(answer, Math.abs(checkA - checkB));
    }
    return;
  }

  for (let i = 0; i < n; i++) {
    if (visited.has(i)) {
      continue;
    }
    visited.add(i);
    sol(depth + 1, count, visited);
    visited.delete(i);
  }
}

// 특정 좌표를 가지고 1가지 ~ (n - 1)가지 고려하면 됨.
// 그런데 어차피 반은 겹치니까 반만 살펴보면 될듯

for (let i = 1; i < Math.floor(n / 2) + 1; i++) {
  // sol 함수 실행
  const visited = new Set();
  sol(0, i, visited);
}

answer === Infinity ? console.log(-1) : console.log(answer);