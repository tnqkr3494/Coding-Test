const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, m, k] = input.shift().split(" ").map(Number);
const notebook = Array.from({ length: n }, () => Array(m).fill(0));

const stickers = [];
for (let i = 0; i < k; i++) {
  const [r, c] = input.shift().split(" ").map(Number);
  const sticker = [];
  for (let i = 0; i < r; i++) {
    sticker.push(input.shift().split(" ").map(Number));
  }
  stickers.push(sticker);
}

// 돌리기
function transpose(graph) {
  return graph[0].map((_, col) => graph.map((row) => row[col]));
}

function rotate(graph) {
  return transpose(graph).map((row) => row.reverse());
}

// 스티커 붙이는게 가능한지 확인하는 함수
function check(nowX, nowY, xLimit, yLimit, sticker) {
  for (let i = 0; i < xLimit; i++) {
    for (let j = 0; j < yLimit; j++) {
      if (notebook[i + nowX][j + nowY] !== 0 && sticker[i][j] === 1) {
        return false;
      }
    }
  }
  return true;
}

// 스티커 붙여보는 함수
function attach(sticker) {
  const xLimit = sticker.length;
  const yLimit = sticker[0].length;
  for (let i = 0; i < n - xLimit + 1; i++) {
    for (let j = 0; j < m - yLimit + 1; j++) {
      // 넣어보기(가능한지)
      if (check(i, j, xLimit, yLimit, sticker)) {
        // 가능하면 실제로 붙이기
        for (let k = 0; k < xLimit; k++) {
          for (let l = 0; l < yLimit; l++) {
            if (sticker[k][l] === 1) {
              notebook[i + k][j + l] = 1;
            }
          }
        }
        return true;
      }
    }
  }
  return false;
}

// 스티커 위에서부터 차례대로 붙여보기
for (let sticker of stickers) {
  for (let i = 0; i < 4; i++) {
    if (attach(sticker)) {
      // 붙일 수 있으면
      break;
    }
    // 붙일 수 없으면
    sticker = rotate(sticker);
  }
}

// 몇개 채웠는지 확인하기
console.log(notebook.flat().reduce((sum, val) => sum + val, 0));