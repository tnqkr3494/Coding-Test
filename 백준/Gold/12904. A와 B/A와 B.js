const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [S, T] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((e) => e.split(""));

function sol(current) {
  if (current.join("") === S.join("")) {
    console.log(1);
    process.exit(0);
  }

  if (current.length <= S.length) return;

  if (current[current.length - 1] === "A") {
    sol(current.slice(0, -1));
  }

  if (current[current.length - 1] === "B") {
    sol(current.slice(0, -1).reverse());
  }
}

sol(T);
console.log(0);