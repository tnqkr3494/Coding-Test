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

function solution(storage, requests) {
    let answer = 0;
    const n = storage.length;
    const m = storage[0].length;
    let graph = storage.map((row) => "0" + row + "0");
    graph.unshift(Array(m + 2).fill("0").join(""));
    graph.push(Array(m + 2).fill("0").join(""));
    graph = graph.map((e) => e.split(""));
    
    const path = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    
    function container(check){
        const q = new Queue();
        const visited = Array.from({length:n + 2}, () => Array(m + 2).fill(false));
        visited[0][0] = true;
        q.push([0, 0]);
        while(!q.isEmpty()){
            const [x, y] = q.pop();
            for(let i = 0; i < 4; i++){
                const [nx, ny] = [x + path[i][0], y + path[i][1]];
                if(0 <= nx && nx < n + 2 && 0 <= ny && ny < m + 2 && !visited[nx][ny]){
                    visited[nx][ny] = true;
                    if(graph[nx][ny] >= "A" && graph[nx][ny] <= "Z"){
                        if(graph[nx][ny] === check){
                            answer++;
                            graph[nx][ny] = "-1";
                        }
                    }
                    else{
                        q.push([nx, ny]);    
                    }        
                }
            }
        }
    }
    
    function crain(check){
        const q = new Queue();
        const visited = Array.from({length:n + 2}, () => Array(m + 2).fill(false));
        visited[0][0] = true;
        q.push([0, 0]);
        
        while(!q.isEmpty()){
            const [x, y] = q.pop();
            if(graph[x][y] === check){
                answer++;
                graph[x][y] = "-1"
            }
            for(let i = 0; i < 4; i++){
                const [nx, ny] = [x + path[i][0], y + path[i][1]];
                if(0 <= nx && nx < n + 2 && 0 <= ny && ny < m + 2 && !visited[nx][ny]){
                    visited[nx][ny] = true;
                    q.push([nx, ny]);
                }
            }
        }
    }
    
    for(const request of requests){
        if(request.length === 1){
            container(request);
        }
        else{
            crain(request[0]);
        }
    }
    
    return n * m - answer;
}