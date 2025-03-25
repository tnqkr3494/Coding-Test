const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const m = Number(input.shift());

const graph = Array.from({ length: n + 1 }, () => []);

for (let i = 0; i < m; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);
  graph[a].push([b, c]);
}

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
      const parentIndex = Math.floor((index - 1) / 2);
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
      if (this.items[small] >= this.items[index]) {
        break;
      }
      this.swap(small, index);
      index = small;
    }
  }
}

const distance = Array.from({ length: n + 1 }, () => Infinity);

function dijkstra(x, distance) {
  const heap = new MinHeap();
  heap.push([0, x]);
  distance[x] = 0;

  while (heap.size() > 0) {
    const [dist, now] = heap.pop();

    if (distance[now] < dist) {
      continue;
    }

    for (const i of graph[now]) {
      let cost = dist + i[1];
      if (cost < distance[i[0]]) {
        distance[i[0]] = cost;
        heap.push([cost, i[0]]);
      }
    }
  }
}

const [start, end] = input[input.length - 1].split(" ").map(Number);
dijkstra(start, distance);
console.log(distance[end]);