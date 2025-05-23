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

function solution(n, wires) {
    let answer = Infinity;
    const path = Array.from({length:n + 1}, () => Array(n + 1).fill(false))
    
    for(const [x, y] of wires)    {
        path[x][y] = true;
        path[y][x] = true;
    }
    
    function BFS(visited, x){
        let cnt = 1;
        const q = new Queue();
        visited[x] = true;
        q.push(x);
        
        while(!q.isEmpty()){
            const x = q.pop();
            
            for(let i = 1; i <= n; i++){
                if(path[x][i] && !visited[i]){
                    q.push(i);
                    cnt++;
                    visited[i] = true;
                }
            }
        }
        
        return cnt;
    }
    
    
    for(const [x, y] of wires){
        const visited = Array(n + 1).fill(false);
        const result = [];
        path[x][y] = false;
        path[y][x] = false;
        
        for(let i = 1; i <= n; i++){
            if(!visited[i]){
                result.push(BFS(visited, i));   
            }
        }
        
        answer = Math.min(answer, Math.abs(result[0] - result[1]));
        
        path[x][y] = true;
        path[y][x] = true;

    }

    return answer;
}