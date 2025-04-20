const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, k] = input[0].split(" ").map(Number);

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

let time = 0;
const answer = [];
const visited = Array.from({ length: 100001 }, () => -1);
const path = Array.from({ length: 100001 }, () => 0);

function BFS() {
  const q = new Queue();
  visited[n] = 0;
  path[n] = -1;
  q.push(n);

  while (!q.isEmpty()) {
    const x = q.pop();
    if (x === k) {
      time = visited[x];
      // 경로를 어떻게 할까?
      let idx = x;
      while (true) {
        answer.push(idx);
        if (path[idx] === -1) {
          break;
        }
        idx = path[idx];
      }
      return;
    }
    let nx = x;

    for (let i = 0; i < 3; i++) {
      if (i === 0) {
        nx = x + 1;
      } else if (i === 1) {
        nx = x - 1;
      } else {
        nx = 2 * x;
      }
      if (0 <= nx && nx <= 100000 && visited[nx] === -1) {
        visited[nx] = visited[x] + 1;
        path[nx] = x;
        q.push(nx);
      }
    }
  }
}

BFS();
console.log(time);
console.log(answer.reverse().join(" "));