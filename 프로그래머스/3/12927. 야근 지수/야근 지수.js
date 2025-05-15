class MaxHeap{
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
        const max = this.items[0];
        this.items[0] = this.items[this.size() - 1];
        this.items.pop();
        this.bubbleDown();
        
        return max;
    }
    
    swap(a, b){
        [this.items[a], this.items[b]] = [this.items[b], this.items[a]]
    }
    
    bubbleUp(){
        let index = this.size() - 1;
        
        while(index > 0){
            const parentIndex = Math.floor((index - 1) / 2);
            
            if(this.items[parentIndex] >= this.items[index]){
                break;
            }
            
            this.swap(parentIndex, index);
            index = parentIndex;
            
        }
    }
    
    bubbleDown(){
        let index = 0;
        
        while(index * 2 + 1 < this.size()){
            const left = index * 2 + 1;
            const right = index * 2 + 2;
            const max = right < this.size() && this.items[left] < this.items[right] ? right : left;
            
            if(this.items[max] <= this.items[index]){
                break;
            }
            
            this.swap(max, index);
            index = max;
        }
    }
}


function solution(n, works) {
    const heap = new MaxHeap();
    let answer = 0;
    
    for(const work of works){
        heap.push(work);
    }
    
    for(let i = 0; i < n; i++){
        let check = heap.pop();
        if(check !== null){
            check -= 1
            if(check > 0){
                heap.push(check);    
            }
            
        }
        else{
            return 0;
        }
    }
    
    
    heap.items.forEach((e) => answer += e ** 2)
    
    
    return answer;
}