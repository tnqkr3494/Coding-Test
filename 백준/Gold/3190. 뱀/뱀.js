const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const graph = Array.from({ length: n }, () => Array(n).fill(0));
const k = Number(input.shift());
let time = 0;

// 사과 위치 설정
for (let i = 0; i < k; i++) {
  const [x, y] = input[i].split(" ").map(Number);
  graph[x - 1][y - 1] = 1;
}

// 방향 전환 명령 저장
const order = [];
const L = Number(input[k]);
for (let i = k + 1; i < k + 1 + L; i++) {
  order.push(input[i].split(" "));
}

const path = [
  [0, 1], // 오른쪽
  [1, 0], // 아래쪽
  [0, -1], // 왼쪽
  [-1, 0], // 위쪽
];

class Queue {
  constructor() {
    this.items = [];
    this.start = 0;
  }
  push(value) {
    this.items.push(value);
  }
  pop() {
    return this.items[this.start++];
  }
  isEmpty() {
    return this.start >= this.items.length;
  }
}

let [x, y] = [0, 0];
let dir = 0;
const snake = new Set(["0,0"]);
const snakeQ = new Queue();
snakeQ.push([0, 0]);

let orderIndex = 0;

while (true) {
  time += 1;
  x += path[dir][0];
  y += path[dir][1];

  if (x < 0 || x >= n || y < 0 || y >= n || snake.has(`${x},${y}`)) {
    break; // 벽에 부딪히거나 자기 몸과 충돌하면 종료
  }

  snake.add(`${x},${y}`);
  snakeQ.push([x, y]);

  if (graph[x][y] === 1) {
    graph[x][y] = 0; // 사과를 먹으면 몸 길이 유지
  } else {
    const [tailX, tailY] = snakeQ.pop();
    snake.delete(`${tailX},${tailY}`); // 사과를 안 먹으면 꼬리 이동
  }

  // 방향 전환 명령 수행
  if (orderIndex < order.length && time === Number(order[orderIndex][0])) {
    dir = order[orderIndex][1] === "L" ? (dir - 1 + 4) % 4 : (dir + 1) % 4;
    orderIndex++;
  }
}

console.log(time);