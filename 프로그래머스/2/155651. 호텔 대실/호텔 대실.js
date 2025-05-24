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
    }
    swap(a, b){
        [this.items[a], this.items[b]] = [this.items[b], this.items[a]]
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
            const left = index * 2 + 1;
            const right = index * 2 + 2;
            const min = right < this.size() && this.items[right] < this.items[left] ? right : left;
            if(this.items[min] >= this.items[index]){
                break;
            }
            this.swap(min, index);
            index = min;
        }
    }
    
}

function calc(arr){
    const temp = arr.split(":").map(Number);
    return temp[0] * 60 + temp[1];
}

function solution(book_time) {
    let answer = 1;
    book_time.sort();
    const heap = new MinHeap();

    heap.push(book_time[0][1]);
    
    for(let i = 1; i < book_time.length; i++){
        const check = heap.items[0];
        if(calc(check) + 10 <= calc(book_time[i][0])){
            heap.pop();
            heap.push(book_time[i][1]);
        }
        else{
            heap.push(book_time[i][1]);
            answer++;
        }
    }
    

    return answer;
}