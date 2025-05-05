const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, k] = input.shift().split(" ").map(Number);
const table = [];
for (let _ = 0; _ < n; _++) {
  table.push(input.shift().split(" ").map(Number));
}

const gyeong = input.shift().split(" ").map(Number);
const minho = input.shift().split(" ").map(Number);

// 순서 => 지우, 경희, 민호
// 2면 i가 이기고, 1이면 비김, 0이면 j가 이김
// 우리가 알아야 되는 정보는 현재 지우, 경희, 민호가 몇번 경기를 진행했었는지,,
// 지우는 n!의 경우의 수로 순서를 나열해서 하나씩 경우를 살펴봐야 한다.

function sol(jiwoo, order, win) {
  // 대결 할 사람 인덱스
  let [a, b] = [0, 1];
  // 대결 할 사람 인덱스에 맞는 지우, 경희, 민호 순서
  const player = [jiwoo, gyeong, minho];

  // 누군가 k번 먼저 이기면 끝난다.
  while (true) {
    if (win[0] === k) {
      return 1;
    } else if (win[1] === k || win[2] === k || order[0] >= n) {
      return 0;
    }

    // 서로 낼 방법

    const [aAttack, bAttack] = [
      player[a][order[a]] - 1,
      player[b][order[b]] - 1,
    ];

    order[a]++;
    order[b]++;

    // 누가 이기는지 결과
    if (
      table[aAttack][bAttack] === 2 ||
      (table[aAttack][bAttack] === 1 && a > b)
    ) {
      // a가 이길 때
      win[a]++;
      // 다음 차례가 문제네,,, 참여하지 않은 어떤 사람
      b = 3 - (a + b);
    } else if (
      table[aAttack][bAttack] === 0 ||
      (table[aAttack][bAttack] === 1 && a < b)
    ) {
      // b가 이길 때
      win[b]++;
      a = 3 - (a + b);
    }
  }
}

const visited = Array(n).fill(false);
function permutations(result) {
  if (result.length === n) {
    // 여기서 가위바위보 경우의 수 계산
    const answer = sol(result, [0, 0, 0], [0, 0, 0]);
    if (answer === 1) {
      process.exit(console.log(1));
    }
    return;
  }

  for (let i = 1; i <= n; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    result.push(i);
    permutations(result);
    result.pop();
    visited[i] = false;
  }
}

permutations([]);

console.log(0);