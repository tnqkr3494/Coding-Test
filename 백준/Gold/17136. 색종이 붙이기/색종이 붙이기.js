const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

let graph = input.map((row) => row.split(" ").map(Number));
const paper = [0, 5, 5, 5, 5, 5];

// 색종이 붙이기
function attach(x, y, size, value, graph) {
  for (let i = x; i < x + size; i++) {
    for (let j = y; j < y + size; j++) {
      graph[i][j] = value;
    }
  }
}

// 조건에 맞는지 check
function check(startX, startY, num, graph) {
  if (startX + num > 10 || startY + num > 10) {
    return false;
  }

  for (let i = startX; i < startX + num; i++) {
    for (let j = startY; j < startY + num; j++) {
      if (graph[i][j] === 0) {
        return false;
      }
    }
  }
  return true;
}

// 재귀로 1 ~ 5까지 넣는 경우
let answer = Infinity;

function sol(depth, graph) {
  if (depth >= answer) return;

  let found = false;

  for (let i = 0; i < 10 && !found; i++) {
    for (let j = 0; j < 10 && !found; j++) {
      if (graph[i][j] === 1) {
        for (let k = 5; k >= 1; k--) {
          if (paper[k] > 0 && check(i, j, k, graph)) {
            paper[k]--;
            attach(i, j, k, 0, graph);
            sol(depth + 1, graph);
            attach(i, j, k, 1, graph);
            paper[k]++;
          }
        }
        found = true; // 여기서 색종이 붙이고 끝!
      }
    }
  }

  // 만약 1을 하나도 못 찾았다는 건 다 덮은 상태임
  if (!found) {
    answer = Math.min(answer, depth);
  }
}

sol(0, graph);

answer === Infinity ? console.log(-1) : console.log(answer);