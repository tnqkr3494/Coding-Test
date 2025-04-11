const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, m, k] = input.shift().split(" ").map(Number);
const land = Array.from({ length: n }, () => Array(n).fill(5));
const eat = [];

const tree = Array.from({ length: n }, () =>
  Array.from({ length: n }, () => [])
);
for (let i = 0; i < n; i++) {
  eat.push(input.shift().split(" ").map(Number));
}

for (let i = 0; i < m; i++) {
  const [x, y, age] = input.shift().split(" ").map(Number);
  tree[x - 1][y - 1].push(age);
}

const path = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1],
];

function spring() {
  const dead = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const live = [];
      tree[i][j].sort((a, b) => a - b);
      for (let k = 0; k < tree[i][j].length; k++) {
        const check = tree[i][j][k];
        if (land[i][j] < check) {
          dead.push([i, j, check]);
        } else {
          land[i][j] -= check;
          live.push(check + 1);
        }
      }
      tree[i][j] = live;
    }
  }
  return dead;
}

function summer(dead) {
  for (const [x, y, age] of dead) {
    land[x][y] += Math.floor(age / 2);
  }
}

function fall() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < tree[i][j].length; k++) {
        if (tree[i][j][k] % 5 === 0) {
          for (let l = 0; l < 8; l++) {
            const ni = i + path[l][0];
            const nj = j + path[l][1];
            if (0 <= ni && ni < n && 0 <= nj && nj < n) {
              tree[ni][nj].push(1);
            }
          }
        }
      }
    }
  }
}

function winter() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      land[i][j] += eat[i][j];
    }
  }
}

for (let i = 0; i < k; i++) {
  const dead = spring();
  summer(dead);
  fall();
  winter();
}

let answer = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    answer += tree[i][j].length;
  }
}

console.log(answer);