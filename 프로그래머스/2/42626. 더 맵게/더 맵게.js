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
        
        return min
    }
    
    swap(a, b){
        [this.items[a], this.items[b]] = [this.items[b], this.items[a]];
    }
    
    bubbleUp(){
        let index = this.size() - 1;
        
        while(index > 0){
            const parentIndex = Math.floor((index - 1) / 2);
            
            if(this.items[parentIndex] <= this.items[index]){
                break;
            }
            this.swap(parentIndex, index);
            index = parentIndex;
        }
    }
    bubbleDown(){
        let index = 0;
        
        while(index * 2 + 1 < this.size()){
            let left = index * 2 + 1;
            let right = index * 2 + 2;
            let small = right < this.size() && this.items[right] < this.items[left] ? right : left;
            
            if(this.items[small] >= this.items[index]){
                break;
            }
            this.swap(small, index);
            index = small;
        }
    }
}



function solution(scoville, K) {
    let answer = 0;
    
    const heap = new MinHeap();
    for(const e of scoville){
        heap.push(e);
    }
    
    while(true){
        const first = heap.pop();
        if(first >= K){
            return answer;
        }
        const second = heap.pop();
        if(!second){
            return -1;
        }
        
        heap.push(first + second * 2);
        answer++;
    }
}