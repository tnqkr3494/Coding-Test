class MinHeap{
    constructor(){
        this.items = [];
    }
    size(){
        return this.items.length;
    }
    push(value){
        this.items.push(value);
        this.bubbleUp();
    }
    pop(){
        if(this.size() === 0){
            return null;
        }
        const min = this.items[0];
        this.items[0] = this.items[this.size() - 1];
        this.items.pop();
        this.bubbleDown();
        return min;
    }
    swap(a, b){
        [this.items[a], this.items[b]] = [this.items[b], this.items[a]]
    }
    bubbleUp(){
        let index = this.size() - 1;
        
        while(index > 0){
            const parentIndex = Math.floor((index - 1) / 2);
            
            if(this.items[index][0] >= this.items[parentIndex][0]){
                break;
            }
            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }
    bubbleDown(){
        let index = 0;
        
        while(index * 2 + 1 < this.size()){
            const left = index * 2 + 1;
            const right = index * 2 + 2;
            const small = right < this.size() && this.items[right][0] < this.items[left][0] ? right : left;
            
            if(this.items[index][0] <= this.items[small][0]){
                break;
            }
            
            this.swap(index, small);
            index = small;
        }
    }
}

function solution(N, road, K) {
    let answer = 0;
    const heap = new MinHeap();
    const distance = Array(N + 1).fill(Infinity);
    const graph = Array.from({length:N + 1}, () => []);
    
    for(const [a, b, c] of road){
        graph[a].push([b, c]);
        graph[b].push([a, c]);
    }
    
    function dijkstra(){
        distance[1] = 0;
        heap.push([0, 1]);
        
        while(heap.size() > 0){
            const [dist, now] = heap.pop();
            if(distance[now] < dist){
                continue;
            }
            for(const [next, dist2] of graph[now]){
                const cost = dist + dist2;
                if(cost < distance[next]){
                    distance[next] = cost;
                    heap.push([cost, next]);
                }
            }
        }
    }
    
    dijkstra();
    for(const e of distance){
        if(e <= K){
            answer++;
        }
    }


    return answer;
}