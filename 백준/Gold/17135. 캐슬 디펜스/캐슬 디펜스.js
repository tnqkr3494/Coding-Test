const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, m, d] = input.shift().split(" ").map(Number);
const originGraph = [];
for (let i = 0; i < n; i++) {
  originGraph.push(input[i].split(" ").map(Number));
}

const combinations = [];

function combine(depth, result, start) {
  if (depth === 3) {
    combinations.push([...result]);
    return;
  }

  for (let i = start; i < m; i++) {
    result.push(i);
    combine(depth + 1, result, i + 1);
    result.pop();
  }
}
// 궁수를 나둘 위치 조합
combine(0, [], 0);

const path = [
  [0, -1],
  [-1, 0],
  [0, 1],
];

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

function sol(combination, originGraph) {
  const graph = originGraph.map((row) => [...row]);
  let result = 0;
  for (let x = n - 1; x >= 0; x--) {
    const check = [];
    for (let y of combination) {
      // x, y 좌표 묶어서 BFS돌려서 가장 가까운 녀석 찾기
      const q = new Queue();
      q.push([x, y, 1]);

      while (!q.isEmpty()) {
        const [x, y, dir] = q.pop();

        if (graph[x][y] === 1) {
          // 바로 잡음, 하지만 동시에 궁수가 잡기 때문에 제거처리하지 말고 일단 임시 대기
          check.push([x, y]);
          break;
        }

        if (dir < d) {
          for (let i = 0; i < 3; i++) {
            const nx = x + path[i][0];
            const ny = y + path[i][1];
            if (0 <= nx && nx < n && 0 <= ny && ny < m && dir < d) {
              q.push([nx, ny, dir + 1]);
            }
          }
        }
      }
    }
    for (const [x, y] of check) {
      if (graph[x][y] === 1) {
        graph[x][y] = 0;
        result++;
      }
    }
  }
  return result;
}

let answer = 0;
for (const combination of combinations) {
  answer = Math.max(answer, sol(combination, originGraph));
}

console.log(answer);