const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const T = Number(input.shift());

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
    return this.start === this.items.end;
  }
}

function BFS(a, b) {
  const visited = Array(10000).fill(false);
  const q = new Queue();
  q.push([a, ""]);
  visited[a] = true;

  while (!q.isEmpty()) {
    const [x, path] = q.pop();

    if (x === b) return path;

    let nx = (2 * x) % 10000;
    if (!visited[nx]) {
      visited[nx] = true;
      q.push([nx, path + "D"]);
    }

    nx = x === 0 ? 9999 : x - 1;
    if (!visited[nx]) {
      visited[nx] = true;
      q.push([nx, path + "S"]);
    }

    nx = (x % 1000) * 10 + Math.floor(x / 1000);
    if (!visited[nx]) {
      visited[nx] = true;
      q.push([nx, path + "L"]);
    }

    nx = (x % 10) * 1000 + Math.floor(x / 10);
    if (!visited[nx]) {
      visited[nx] = true;
      q.push([nx, path + "R"]);
    }
  }
}

const answer = [];
for (let i = 0; i < T; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  answer.push(BFS(a, b));
}

console.log(answer.join("\n"));