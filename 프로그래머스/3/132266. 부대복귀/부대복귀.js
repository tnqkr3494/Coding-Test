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

function solution(n, roads, sources, destination) {
    const answer = [];
    const visited = Array.from({length:n + 1}, () => -1);
    const path = Array.from({length:n + 1}, () => []);
    for(const [a, b] of roads){
        path[a].push(b);
        path[b].push(a);
    }
    
    function BFS(){
        const q = new Queue();
        q.push(destination);
        visited[destination] = 0;
        
        while(!q.isEmpty()){
            const x = q.pop();
            for(let i = 0; i < path[x].length; i++){
                const nx = path[x][i];
                if(visited[nx] === -1){
                    visited[nx] = visited[x] + 1;
                    q.push(nx);
                }
            }
        }
    }
    
    BFS();
    
    for(const source of sources){
        answer.push(visited[source]);
    }
    
    
    return answer;
}