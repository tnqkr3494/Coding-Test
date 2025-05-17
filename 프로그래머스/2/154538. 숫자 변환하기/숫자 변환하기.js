class Queue{
    items = [];
    start = 0;
    end = 0;
    
    push(value){
        this.items.push(value);
        this.end++;
    }
    pop(){
        return this.items[this.start++];
    }
    isEmpty(){
        return this.start === this.end;
    }
}

function solution(x, y, n) {
    const visited = Array(y + 1).fill(-1);
    const q = new Queue();
    q.push(x);
    visited[x] = 0;
    
    while(!q.isEmpty()){
        const a = q.pop();
        if(a === y){
            return visited[a];
        }
        
        for(const nx of [a + n, a * 2, a * 3]){
            if(nx <= y && visited[nx] === -1){
                q.push(nx)
                visited[nx] = visited[a] + 1;
            }
        }
    }
    
    return -1
}