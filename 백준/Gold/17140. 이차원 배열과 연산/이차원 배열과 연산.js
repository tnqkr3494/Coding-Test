const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [r, c, k] = input.shift().split(" ").map(Number);
let graph = [];

for (let i = 0; i < 3; i++) {
  graph.push(input[i].split(" ").map(Number));
}

function sol(graph) {
  const newGraph = [];
  let maxCnt = -1;

  for (let i = 0; i < graph.length; i++) {
    const count = {};
    const arr = [];

    for (let j = 0; j < graph[0].length; j++) {
      const num = graph[i][j];
      if (num !== 0) {
        count[num] = (count[num] || 0) + 1;
      }
    }

    for (const key in count) {
      arr.push([Number(key), count[key]]);
    }
    arr.sort((a, b) => a[1] - b[1] || a[0] - b[0]);

    const temp = [];
    for (const items of arr) {
      temp.push(...items);
    }
    temp.splice(100);
    maxCnt = Math.max(maxCnt, temp.length);
    newGraph.push(temp);
  }

  // 0 뒤에 채우고 newGraph에 넣기

  for (let i = 0; i < newGraph.length; i++) {
    for (let j = newGraph[i].length; j < maxCnt; j++) {
      newGraph[i].push(0);
    }
  }

  return newGraph;
}

for (let i = 0; i < 101; i++) {
  if (
    r - 1 < graph.length &&
    c - 1 < graph[0].length &&
    graph[r - 1][c - 1] === k
  ) {
    console.log(i);
    process.exit(0);
  }

  if (graph.length >= graph[0].length) {
    graph = sol(graph);
  } else {
    //전치
    graph = graph[0].map((_, i) => graph.map((row) => row[i]));
    graph = sol(graph);
    graph = graph[0].map((_, i) => graph.map((row) => row[i]));
  }
}
console.log(-1);