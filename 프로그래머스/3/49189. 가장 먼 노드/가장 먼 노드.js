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


function solution(n, vertex) {
    let answer = 0;
    const visited = Array(n + 1).fill(-1);
    const graph = Array.from({length:n + 1}, () => []);
    
    for(const [a, b] of vertex){
        graph[a].push(b);
        graph[b].push(a);
    }
    
    const q = new Queue();
    visited[1] = 0;
    q.push(1);
    
    while(!q.isEmpty()){
        const x = q.pop();
        for(let i = 0; i < graph[x].length; i++){
            const check = graph[x][i]
            if(visited[check] === -1){
                visited[check] = visited[x] + 1;
                q.push(check);
            }
        }
    }
    visited.sort((a, b) => b - a)
    
    return visited.filter((e) => e === visited[0]).length;
}