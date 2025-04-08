const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const t = Number(input.shift());

const path = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

// 방문했던 경로 처리를 어떻게 할지가 이 문제의 핵심.
// 1. 새로운 키를 챙기면 방문 했던 것도 다시 갈 수 있게? => 이게 맞네

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

function BFS(h, w, graph, keys) {
  let result = 0;
  let visited = Array.from({ length: h + 2 }, () => Array(w + 2).fill(false));

  let q = new Queue();
  q.push([0, 0]);
  visited[0][0] = true;

  while (!q.isEmpty()) {
    const [x, y] = q.pop();

    for (let i = 0; i < 4; i++) {
      const nx = x + path[i][0];
      const ny = y + path[i][1];
      if (
        0 <= nx &&
        nx < h + 2 &&
        0 <= ny &&
        ny < w + 2 &&
        graph[nx][ny] !== "*" &&
        !visited[nx][ny]
      ) {
        if (graph[nx][ny] === ".") {
          q.push([nx, ny]);
          visited[nx][ny] = true;
        } else if (graph[nx][ny] === "$") {
          result += 1;
          visited[nx][ny] = true;
          q.push([nx, ny]);
          graph[nx][ny] = ".";
        } else if (
          graph[nx][ny].charCodeAt(0) >= "A".charCodeAt(0) &&
          graph[nx][ny].charCodeAt(0) <= "Z".charCodeAt(0)
        ) {
          // 키 찾기
          if (keys.has(graph[nx][ny].toLowerCase())) {
            graph[nx][ny] = ".";
            q.push([nx, ny]);
          }
          visited[nx][ny] = true;
        } else if (
          graph[nx][ny].charCodeAt(0) >= "a".charCodeAt(0) &&
          graph[nx][ny].charCodeAt(0) <= "z".charCodeAt(0)
        ) {
          // 새로운 키 찾았으니 기존 방문했던 경로 다시 이동가능
          keys.add(graph[nx][ny]);

          visited = Array.from({ length: h + 2 }, () =>
            Array(w + 2).fill(false)
          );
          q = new Queue();
          q.push([nx, ny]);
          graph[nx][ny] = ".";
        }
      }
    }
  }

  return result;
}

const answer = [];

for (let _ = 0; _ < t; _++) {
  const [h, w] = input.shift().split(" ").map(Number);
  const graph = [];
  graph.push(Array.from({ length: w + 2 }, () => "."));
  for (let _ = 0; _ < h; _++) {
    graph.push((["."] + input.shift() + ["."]).split(""));
  }
  graph.push(Array.from({ length: w + 2 }, () => "."));
  const keys = new Set(input.shift().split(""));

  answer.push(BFS(h, w, graph, keys));
}

console.log(answer.join("\n"));