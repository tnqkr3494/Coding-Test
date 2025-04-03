const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const t = Number(input.shift());
const answer = [];

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

function sol(x, y, endX, endY, grocery) {
  const q = new Queue();
  visited = new Set();
  q.push([x, y]);
  visited.add(`${x},${y}`);

  while (!q.isEmpty()) {
    const [x, y] = q.pop();

    if (Math.abs(x - endX) + Math.abs(y - endY) <= 1000) {
      return true;
    }

    for (let i = 0; i < grocery.length; i++) {
      if (
        Math.abs(x - grocery[i][0]) + Math.abs(y - grocery[i][1]) <= 1000 &&
        !visited.has(`${grocery[i][0]},${grocery[i][1]}`)
      ) {
        q.push([grocery[i][0], grocery[i][1]]);
        visited.add(`${grocery[i][0]},${grocery[i][1]}`);
      }
    }
  }

  return false;
}

for (let _ = 0; _ < t; _++) {
  const n = Number(input.shift());
  const [startX, startY] = input.shift().split(" ").map(Number);
  const grocery = [];
  for (let i = 0; i < n; i++) {
    grocery.push(input.shift().split(" ").map(Number));
  }
  const [endX, endY] = input.shift().split(" ").map(Number);

  sol(startX, startY, endX, endY, grocery)
    ? answer.push("happy")
    : answer.push("sad");
}

console.log(answer.join("\n"));