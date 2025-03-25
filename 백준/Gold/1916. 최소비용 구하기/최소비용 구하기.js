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
    if (this.size() === 0) return null;
    const min = this.items[0];
    const last = this.items.pop();
    if (this.size() > 0) {
      this.items[0] = last;
      this.bubbleDown();
    }
    return min;
  }

  swap(a, b) {
    [this.items[a], this.items[b]] = [this.items[b], this.items[a]];
  }

  bubbleUp() {
    let index = this.size() - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.items[parentIndex][0] <= this.items[index][0]) break;
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
        right < this.size() && this.items[right][0] < this.items[left][0]
          ? right
          : left;
      if (this.items[small][0] >= this.items[index][0]) break;
      this.swap(small, index);
      index = small;
    }
  }
}

const distance = Array.from({ length: n + 1 }, () => Infinity);

function dijkstra(start) {
  const heap = new MinHeap();
  heap.push([0, start]);
  distance[start] = 0;

  while (heap.size() > 0) {
    const minNode = heap.pop();
    if (!minNode) continue;

    const [dist, now] = minNode;
    if (distance[now] < dist) continue;

    for (const [next, cost] of graph[now]) {
      let newCost = dist + cost;
      if (newCost < distance[next]) {
        distance[next] = newCost;
        heap.push([newCost, next]);
      }
    }
  }
}

const [start, end] = input[input.length - 1].split(" ").map(Number);
dijkstra(start);
console.log(distance[end]);