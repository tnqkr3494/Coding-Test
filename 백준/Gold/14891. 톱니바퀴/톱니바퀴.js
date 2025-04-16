const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const wheel = [];
let answer = 0;

for (let i = 0; i < 4; i++) {
  wheel.push(input.shift().split("").map(Number));
}
const k = Number(input.shift());

const turn = [];

for (let i = 0; i < k; i++) {
  turn.push(input.shift().split(" ").map(Number));
}

// 맞닿은 톱니의 극이 다르면 => 반대 방향으로 회전. 극이 같으면 회전하지 않는다

// 0 : N극, 1 : S극
// 서로 맞닿는 위치가 어딘지 인덱스로 판단
// 시계방향 => pop, unshift, 반시계 방향 => shift, push(시간 초과 걱정 X)
// 오른쪽 : 2, 왼쪽 : 6

function move(dir, arr) {
  switch (dir) {
    // 회전 X
    case 0:
      break;
    // 시계
    case 1:
      arr.unshift(arr.pop());
      break;
    // 반시계
    case -1:
      arr.push(arr.shift());
      break;
  }
}

function score(wheel) {
  if (wheel[0][0] === 1) {
    answer += 1;
  }
  if (wheel[1][0] === 1) {
    answer += 2;
  }
  if (wheel[2][0] === 1) {
    answer += 4;
  }
  if (wheel[3][0] === 1) {
    answer += 8;
  }
}

for (let [num, dir] of turn) {
  num -= 1;
  // num을 기준으로 왼쪽 오른쪽을 가보면 어떨까,,,
  let newDir = [0, 0, 0, 0];
  newDir[num] = dir;
  for (let i = num + 1; i < 4; i++) {
    if (wheel[i - 1][2] !== wheel[i][6]) {
      newDir[i] = newDir[i - 1] * -1;
    } else {
      break;
    }
  }
  for (let i = num - 1; i >= 0; i--) {
    if (wheel[i + 1][6] !== wheel[i][2]) {
      newDir[i] = newDir[i + 1] * -1;
    } else {
      break;
    }
  }
  for (let i = 0; i < 4; i++) {
    move(newDir[i], wheel[i]);
  }
}

score(wheel);
console.log(answer);