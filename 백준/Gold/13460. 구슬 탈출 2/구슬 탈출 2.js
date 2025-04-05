const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const graph = [];
let [redX, redY] = [0, 0];
let [blueX, blueY] = [0, 0];

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

for (let i = 0; i < input.length; i++) {
  graph.push(input[i].split(""));
  for (let j = 0; j < graph[i].length; j++) {
    if (graph[i][j] === "R") {
      [redX, redY] = [i, j];
    } else if (graph[i][j] === "B") {
      [blueX, blueY] = [i, j];
    }
  }
}

const q = new Queue();
const visited = new Set();
visited.add(`${redX}${redY}${blueX}${blueY}`);
q.push([redX, redY, blueX, blueY, 0]);

const path = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

// 벽에 부딪히면 stop, 다른 구슬에 부딪히면 stop(이게 문제)

let answer = -1;
function BFS(q, visited) {
  while (!q.isEmpty()) {
    const [redX, redY, blueX, blueY, time] = q.pop();
    if (time > 10) {
      return -1;
    }
    if (graph[redX][redY] === "O" && time <= 10) {
      return time;
    }
    for (let i = 0; i < 4; i++) {
      let [nredX, nredY, nblueX, nblueY] = [redX, redY, blueX, blueY];
      let [redCnt, blueCnt] = [0, 0];
      while (true) {
        nredX += path[i][0];
        nredY += path[i][1];
        redCnt++;
        if (graph[nredX][nredY] === "#") {
          nredX -= path[i][0];
          nredY -= path[i][1];
          break;
        } else if (graph[nredX][nredY] === "O") {
          break;
        }
      }
      while (true) {
        nblueX += path[i][0];
        nblueY += path[i][1];
        blueCnt++;
        if (graph[nblueX][nblueY] === "#") {
          nblueX -= path[i][0];
          nblueY -= path[i][1];
          break;
        } else if (graph[nblueX][nblueY] === "O") {
          break;
        }
      }
      // 구슬끼리 겹치는 체크
      if (nredX === nblueX && nredY === nblueY) {
        if (graph[nredX][nredY] === "O") {
          // 만약에 둘다 빠지면
          continue;
        } else {
          //서로 부딪히기만 하는 경우(이게 어렵네... 아아아아아아)
          if (redCnt > blueCnt) {
            //이러면 blue가 먼저 온것
            nredX -= path[i][0];
            nredY -= path[i][1];
          } else {
            //red가 먼저 온 것
            nblueX -= path[i][0];
            nblueY -= path[i][1];
          }
        }
      } else {
        if (graph[nblueX][nblueY] === "O") {
          continue;
        }
      }
      if (!visited.has(`${nredX}${nredY}${nblueX}${nblueY}`)) {
        q.push([nredX, nredY, nblueX, nblueY, time + 1]);
        visited.add(`${nredX}${nredY}${nblueX}${nblueY}`);
      }
    }
  }
  return -1;
}

answer = BFS(q, visited);
console.log(answer);