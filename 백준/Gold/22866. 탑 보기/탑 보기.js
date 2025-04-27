const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const arr = input[0].split(" ").map(Number);
let answer = Array.from({ length: n }, () => [0, 0]);
const check = {};
const pathCheck = {};
let stack = [];

// 오른쪽에 볼 수 있는 건물
const reverseArr = [...arr].reverse();
for (let i = 0; i < n; i++) {
  while (stack.length > 0) {
    if (stack[stack.length - 1][1] > reverseArr[i]) {
      // 먼저 확인하기 때문에 들어가는 값이 바로 정답(거리, 번호)
      pathCheck[n - i - 1] = [
        stack[stack.length - 1][0] - (n - i - 1),
        stack[stack.length - 1][0] + 1,
      ];
      if (check[n - i - 1]) {
        check[n - i - 1] += stack.length;
      } else {
        check[n - i - 1] = stack.length;
      }
      break;
    }
    stack.pop();
  }

  stack.push([n - i - 1, reverseArr[i]]);
}

stack = [];

// 왼쪽에 볼 수 있는 건물
for (let i = 0; i < n; i++) {
  while (stack.length > 0) {
    if (stack[stack.length - 1][1] > arr[i]) {
      // 여기서는 기존에 들어간 값이 있을 수 있기 때문에 확인작업
      if (pathCheck[i]) {
        // 거리 비교 및 거리가 동일하면 번호 순서

        if (pathCheck[i][0] > i - stack[stack.length - 1][0]) {
          pathCheck[i] = [
            i - stack[stack.length - 1][0],
            stack[stack.length - 1][0] + 1,
          ];
        } else if (pathCheck[i][0] === i - stack[stack.length - 1][0]) {
          pathCheck[i][1] = Math.min(
            pathCheck[i][1],
            stack[stack.length - 1][0] + 1
          );
        }
      } else {
        pathCheck[i] = [
          i - stack[stack.length - 1][0],
          stack[stack.length - 1][0] + 1,
        ];
      }

      answer[i][1] = stack[stack.length - 1][0] + 1;
      if (check[i]) {
        check[i] += stack.length;
      } else {
        check[i] = stack.length;
      }
      break;
    }
    stack.pop();
  }
  stack.push([i, arr[i]]);
}

for (let i = 0; i < n; i++) {
  if (check[i]) {
    answer[i] = [check[i], pathCheck[i][1]];
  } else {
    answer[i] = [0];
  }
}

console.log(answer.join("\n").replaceAll(",", " "));