const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const arr = [];
let answer = 0;

for (let i = 0; i < n; i++) {
  arr.push(input[i].split(" ").map(Number));
}

arr.sort((a, b) => a[0] - b[0]);

class MinHeap {
  constructor() {
    this.items = [];
  }

  size() {
    return this.items.length;
  }

  push(value) {
    this.items.push(value);
    this.bubbleUp();
  }

  pop() {
    if (this.size() === 0) {
      return null;
    }
    const min = this.items[0];
    this.items[0] = this.items[this.size() - 1];
    this.items.pop();
    this.bubbleDown();
    return min;
  }

  swap(a, b) {
    [this.items[a], this.items[b]] = [this.items[b], this.items[a]];
  }

  bubbleUp() {
    let index = this.size() - 1;

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);

      if (this.items[parentIndex] <= this.items[index]) {
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
      let small =
        right < this.size() && this.items[right] < this.items[left]
          ? right
          : left;

      if (this.items[index] <= this.items[small]) {
        break;
      }
      this.swap(index, small);
      index = small;
    }
  }
}

const heap = new MinHeap();

heap.push(arr[0][1]);
answer += 1;

for (let i = 1; i < n; i++) {
  if (heap.items[0] <= arr[i][0]) {
    heap.pop();
    heap.push(arr[i][1]);
  } else {
    answer += 1;
    heap.push(arr[i][1]);
  }
}

console.log(answer);