const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const arr = input[0].split("");

if (n <= 3) {
  console.log(eval(arr.join("")));
} else {
  // 괄호를 배치할 조합 세팅
  function combinations(depth, result, start, limit, combines) {
    if (depth === limit) {
      combines.push([...result]);
      return;
    }

    for (let i = start; i < Math.floor(n / 2); i++) {
      result.push(i * 2);
      combinations(depth + 1, result, i + 2, limit, combines);
      result.pop();
    }
  }

  let answer = Math.pow(-2, 31);
  for (let i = 1; i <= Math.floor(n / 2) - 1; i++) {
    const combines = [];
    combinations(0, [], 0, i, combines);

    for (let j = 0; j < combines.length; j++) {
      let newArr = [...arr];
      for (const idx of combines[j]) {
        // 괄호 놓기
        newArr[idx] = eval(newArr.slice(idx, idx + 3).join(""));
        [newArr[idx + 1], newArr[idx + 2]] = ["", ""];
      }
      // 괄호 놓으면서 ""이렇게 만든 값 원상 복구하고 전체 식 계산, 여기서는 eval쓰면 안되는데 그 이유는 연산 순서가 왼쪽에서 오른쪽
      newArr = newArr.filter((e) => e !== "");

      let result = Number(newArr[0]);
      for (let k = 1; k < newArr.length; k += 2) {
        switch (newArr[k]) {
          case "+":
            result += Number(newArr[k + 1]);
            break;

          case "-":
            result -= Number(newArr[k + 1]);
            break;

          case "*":
            result *= Number(newArr[k + 1]);
            break;
        }
      }
      answer = Math.max(answer, result);
    }
  }

  console.log(answer);
}