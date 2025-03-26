const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [S, T] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((e) => e.split(""));

function sol(depth, result) {
  if (depth === S.length) {
    if (result.join("") === S.join("")) {
      console.log(1);
      process.exit(0);
    }
    return;
  }

  if (result[result.length - 1] === "A") {
    result.pop();
    sol(depth - 1, result);
    result.push("A");
  }

  if (result[result.length - 1] === "B") {
    result.pop();
    result.reverse();
    sol(depth - 1, result);
    result.reverse();
    result.push("B");
  }
}

sol(T.length, T);
console.log(0);