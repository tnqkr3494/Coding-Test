const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const ch = require("fs").readFileSync(filePath).toString().trim();

const check = ["P", "P", "A", "P"];
const stack = [];

for (const e of ch) {
  stack.push(e);
  if (stack.length >= 4 && stack.slice(-4).join("") === check.join("")) {
    stack.splice(-4);
    stack.push("P");
  }
}

if (stack.length === 1 && stack[0] === "P") {
  console.log("PPAP");
} else {
  console.log("NP");
}