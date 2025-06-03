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
            const parent = Math.floor((index - 1) / 2);
            if (
                this.items[parent][0] < this.items[index][0] ||
                (this.items[parent][0] === this.items[index][0] &&
                    this.items[parent][1] <= this.items[index][1])
            ) {
                break;
            }
            this.swap(parent, index);
            index = parent;
        }
    }

    bubbleDown() {
        let index = 0;
        while (index * 2 + 1 < this.size()) {
            const left = index * 2 + 1;
            const right = index * 2 + 2;
            let small = left;

            if (
                right < this.size() &&
                (this.items[right][0] < this.items[left][0] ||
                    (this.items[right][0] === this.items[left][0] &&
                        this.items[right][1] <= this.items[left][1]))
            ) {
                small = right;
            }

            if (
                this.items[small][0] > this.items[index][0] ||
                (this.items[small][0] === this.items[index][0] &&
                    this.items[small][1] >= this.items[index][1])
            ) {
                break;
            }

            this.swap(small, index);
            index = small;
        }
    }
}

function solution(jobs) {
    jobs.sort((a, b) => a[0] - b[0]);

    const heap = new MinHeap();
    let time = 0;
    let index = 0;
    let count = 0;
    let total = 0;

    while (count < jobs.length) {
        while (index < jobs.length && jobs[index][0] <= time) {
            heap.push([jobs[index][1], jobs[index][0]]); // [작업시간, 요청시간]
            index++;
        }

        if (heap.size() > 0) {
            const [jobTime, requestTime] = heap.pop();
            time += jobTime;
            total += time - requestTime;
            count++;
        } else {
            if (index < jobs.length) {
                time = jobs[index][0];
            }
        }
    }

    return Math.floor(total / jobs.length);
}
