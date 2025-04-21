const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

let graph = input.map((row) => row.split(" ").map(Number));
const paper = [0, 5, 5, 5, 5, 5];

// 색종이 붙이기
function attachPaper(startX, startY, num, graph) {
  const newGraph = graph.map((row) => [...row]);

  for (let i = startX; i < startX + num; i++) {
    for (let j = startY; j < startY + num; j++) {
      newGraph[i][j] = 0;
    }
  }
  return newGraph;
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

function clear(graph) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (graph[i][j] === 1) {
        return false;
      }
    }
  }
  return true;
}

// 재귀로 1 ~ 5까지 넣는 경우
let answer = Infinity;

function sol(depth, graph) {
  // 색종이 전부 붙였는지 확인하기
  if (clear(graph)) {
    answer = Math.min(answer, depth);
  }

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (graph[i][j] === 1) {
        // 색종이 넣을 수 있는지 확인하고 5가지 색종이 다 넣어보기
        const temp = graph.map((row) => [...row]);
        for (let k = 5; k >= 1; k--) {
          // 색종이가 남아있고, check를 통과하면
          if (paper[k] > 0 && check(i, j, k, graph)) {
            paper[k] -= 1;
            graph = attachPaper(i, j, k, graph);
            sol(depth + 1, graph);
            graph = temp;
            paper[k] += 1;
          }
        }
        return;
      }
    }
  }
}

sol(0, graph);

answer === Infinity ? console.log(-1) : console.log(answer);