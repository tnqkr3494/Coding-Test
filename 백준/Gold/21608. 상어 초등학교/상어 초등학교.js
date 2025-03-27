const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");
let [n, ...arr] = input;
let answer = 0;
const dic = {};
n = Number(n);
arr = arr.map((e) => e.split(" ").map(Number));

for (let i = 0; i < arr.length; i++) {
  for (let j = 1; j < arr[i].length; j++) {
    if (dic[arr[i][0]]) {
      dic[arr[i][0]].push(arr[i][j]);
    } else {
      dic[arr[i][0]] = [arr[i][j]];
    }
  }
}

const graph = Array.from({ length: n }, () => Array(n).fill(0));

const path = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function sol(num, graph) {
  const result = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let cnt = 0;
      let empty = 0;
      if (graph[i][j] === 0) {
        // 몇개 인접한지 체크
        for (let k = 0; k < 4; k++) {
          const ni = i + path[k][0];
          const nj = j + path[k][1];
          if (0 <= ni && ni < n && 0 <= nj && nj < n) {
            if (dic[num].includes(graph[ni][nj])) {
              cnt += 1;
            } else if (graph[ni][nj] === 0) {
              empty += 1;
            }
          }
        }
        result.push([i, j, cnt, empty]);
      }
    }
  }

  result.sort(
    (a, b) => b[2] - a[2] || b[3] - a[3] || a[0] - b[0] || a[1] - b[1]
  );

  graph[result[0][0]][result[0][1]] = num;
}

function cal(graph) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let cnt = 0;
      for (let k = 0; k < 4; k++) {
        const ni = i + path[k][0];
        const nj = j + path[k][1];

        if (0 <= ni && ni < n && 0 <= nj && nj < n) {
          if (dic[graph[i][j]] && dic[graph[i][j]].includes(graph[ni][nj])) {
            cnt += 1;
          }
        }
      }
      if (cnt > 0) {
        answer += 10 ** (cnt - 1);
      }
    }
  }
}

for (let i = 0; i < arr.length; i++) {
  sol(arr[i][0], graph);
}

cal(graph);
console.log(answer);