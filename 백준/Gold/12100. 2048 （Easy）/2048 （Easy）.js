const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
let graph = [];

for (let i = 0; i < n; i++) {
  graph.push(input[i].split(" ").map(Number));
}

// 만약 겹치는 자리에서 숫자가 동일하면 합쳐지고, 아니면 합쳐지지 않는다.
function move(dir, graph) {
  const newGraph = graph.map((row) => [...row]);

  // 다음으로 합쳐질, 움직일 위치를 가지고 있어야함
  switch (dir) {
    //왼
    case 0:
      for (let i = 0; i < n; i++) {
        let temp = 0;
        for (let j = 1; j < n; j++) {
          if (newGraph[i][j] === 0) {
            continue;
          }
          // 합쳐질 위치가 0이면
          if (newGraph[i][temp] === 0) {
            newGraph[i][temp] = newGraph[i][j];
            newGraph[i][j] = 0;
          }
          // 합쳐질 위치가 숫자가 존재하면
          else {
            if (newGraph[i][temp] === newGraph[i][j]) {
              newGraph[i][temp] *= 2;
              newGraph[i][j] = 0;
            } else {
              if (newGraph[i][temp + 1] === 0) {
                newGraph[i][temp + 1] = newGraph[i][j];
                newGraph[i][j] = 0;
              }
            }
            temp++;
          }
        }
      }
      break;
    //오
    case 1:
      for (let i = 0; i < n; i++) {
        let temp = n - 1;
        for (let j = n - 2; j >= 0; j--) {
          if (newGraph[i][j] === 0) {
            continue;
          }
          // 합쳐질 위치가 0이면
          if (newGraph[i][temp] === 0) {
            newGraph[i][temp] = newGraph[i][j];
            newGraph[i][j] = 0;
          }
          // 합쳐질 위치가 숫자가 존재하면
          else {
            if (newGraph[i][temp] === newGraph[i][j]) {
              newGraph[i][temp] *= 2;
              newGraph[i][j] = 0;
            } else {
              if (newGraph[i][temp - 1] === 0) {
                newGraph[i][temp - 1] = newGraph[i][j];
                newGraph[i][j] = 0;
              }
            }
            temp--;
          }
        }
      }
      break;

    //위
    case 2:
      for (let j = 0; j < n; j++) {
        let temp = 0;
        for (let i = 1; i < n; i++) {
          if (newGraph[i][j] === 0) {
            continue;
          }
          // 합쳐질 위치가 0이면
          if (newGraph[temp][j] === 0) {
            newGraph[temp][j] = newGraph[i][j];
            newGraph[i][j] = 0;
          }
          // 합쳐질 위치가 숫자가 존재하면
          else {
            if (newGraph[temp][j] === newGraph[i][j]) {
              newGraph[temp][j] *= 2;
              newGraph[i][j] = 0;
            } else {
              if (newGraph[temp + 1][j] === 0) {
                newGraph[temp + 1][j] = newGraph[i][j];
                newGraph[i][j] = 0;
              }
            }
            temp++;
          }
        }
      }
      break;

    //아래
    case 3:
      for (let j = 0; j < n; j++) {
        let temp = n - 1;
        for (let i = n - 2; i >= 0; i--) {
          if (newGraph[i][j] === 0) {
            continue;
          }
          // 합쳐질 위치가 0이면
          if (newGraph[temp][j] === 0) {
            newGraph[temp][j] = newGraph[i][j];
            newGraph[i][j] = 0;
          }
          // 합쳐질 위치가 숫자가 존재하면
          else {
            if (newGraph[temp][j] === newGraph[i][j]) {
              newGraph[temp][j] *= 2;
              newGraph[i][j] = 0;
            } else {
              if (newGraph[temp - 1][j] === 0) {
                newGraph[temp - 1][j] = newGraph[i][j];
                newGraph[i][j] = 0;
              }
            }
            temp--;
          }
        }
      }
      break;
  }

  return newGraph;
}

let answer = 2;

// // 5번 이동 => 재귀
function sol(depth, graph) {
  // 큰 블록 구하고

  if (depth > 5) {
    return;
  }
  answer = Math.max(answer, ...graph.flat());
  const temp = graph.map((row) => [...row]);
  for (let i = 0; i < 4; i++) {
    graph = move(i, graph);
    sol(depth + 1, graph);
    graph = temp;
  }
}

sol(0, graph);

console.log(answer);