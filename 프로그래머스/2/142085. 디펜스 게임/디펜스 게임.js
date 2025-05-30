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
            const parent = Math.floor((index - 1) / 2);
            
            if(this.items[parent] >= this.items[index]){
                break;
            }
            this.swap(parent, index);
            index = parent;
        }
    }
    bubbleDown(){
        let index = 0;
        
        while(index * 2 + 1 < this.size()){
            const left = index * 2 + 1;
            const right = index * 2 + 2;
            const big = right < this.size() && this.items[right] > this.items[left] ? right : left;
            
            if(this.items[big] <= this.items[index]){
                break;
            }
            this.swap(big, index);
            index = big;
        }
    }
}



function solution(n, k, enemy) {
    const answer = 0;
    const heap = new MaxHeap();
    let total = 0;
    
    for(let i = 0; i < enemy.length; i++){
        heap.push(enemy[i]);
        total += enemy[i];
        if(total > n){
            if(k > 0){
                const check = heap.pop();
                total -= check;
                k -= 1;
            }
            else{
                return i;
            }
            
        }
    }
    
    
    return enemy.length;
}