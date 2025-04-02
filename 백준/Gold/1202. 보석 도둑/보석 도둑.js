const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, k] = input.shift().split(" ").map(Number);
const gems = [];
const bags = [];

for (let i = 0; i < n; i++) {
  gems.push(input[i].split(" ").map(Number));
}

gems.sort((a, b) => b[0] - a[0]);

for (let i = n; i < n + k; i++) {
  bags.push(Number(input[i]));
}

bags.sort((a, b) => a - b);

class MaxHeap {
  constructor() {
    this.items = [];
  }

  size() {
    return this.items.length;
  }

  swap(a, b) {
    [this.items[a], this.items[b]] = [this.items[b], this.items[a]];
  }

  push(value) {
    this.items.push(value);
    this.bubbleUp();
  }

  pop() {
    if (this.size() === 0) {
      return null;
    }

    const max = this.items[0];
    this.items[0] = this.items[this.size() - 1];
    this.items.pop();
    this.bubbleDown();

    return max;
  }

  bubbleUp() {
    let index = this.size() - 1;

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (this.items[parentIndex] >= this.items[index]) {
        break;
      }
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  bubbleDown() {
    let index = 0;

    while (index * 2 + 1 < this.size()) {
      let left = index * 2 + 1;
      let right = index * 2 + 2;
      let big =
        right < this.size() && this.items[right] > this.items[left]
          ? right
          : left;

      if (this.items[big] <= this.items[index]) {
        break;
      }
      this.swap(big, index);
      index = big;
    }
  }
}

const heap = new MaxHeap();
let answer = 0;

for (const bag of bags) {
  while (gems.length > 0 && gems[gems.length - 1][0] <= bag) {
    heap.push(gems.pop()[1]);
  }

  if (heap.size() > 0) {
    answer += heap.pop();
  }
}

console.log(answer);