const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const arr = [];
for (let i = 0; i < n; i++) {
  arr.push(input[i].split(" ").map(Number));
}

function permutation(temp, used, result, permutations) {
  if (result.length === 8) {
    permutations.push([...result]);
    return;
  }

  for (let i = 0; i < 8; i++) {
    if (used[i]) continue;
    used[i] = true;
    result.push(temp[i]);
    permutation(temp, used, result, permutations);
    result.pop();
    used[i] = false;
  }
}

const temp = [1, 2, 3, 4, 5, 6, 7, 8];
const permutations = [];
permutation(temp, Array(8).fill(false), [], permutations);

let answer = 0;
for (const p of permutations) {
  const player = [...p.slice(0, 3), 0, ...p.slice(3)];
  let score = 0;
  // 해당 이닝에 선수 순서를 체크하기 위한 변수
  let idx = 0;
  for (let i = 0; i < n; i++) {
    let out = 0;
    let base = [0, 0, 0];
    while (out < 3) {
      // 3 out 되기 전까지 idx늘려가며 다음선수 타석에 들어섬.
      switch (arr[i][player[idx]]) {
        case 0:
          out++;
          break;
        case 1:
          score += base[2];
          base = [1, base[0], base[1]];
          break;
        case 2:
          score += base[1] + base[2];
          base = [0, 1, base[0]];
          break;
        case 3:
          score += base[0] + base[1] + base[2];
          base = [0, 0, 1];
          break;
        case 4:
          score += base[0] + base[1] + base[2] + 1;
          base = [0, 0, 0];
          break;
      }
      idx = (idx + 1) % 9;
    }
  }
  answer = Math.max(answer, score);
}

console.log(answer);