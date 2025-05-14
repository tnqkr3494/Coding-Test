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


function solution(maps) {
    const path = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const visited = Array.from({length:maps.length}, () => Array(maps[0].length).fill(-1));
    
    function BFS(x, y){
        const q = new Queue();
        q.push([0, 0]);
        visited[0][0] = 1;
        
        while(!q.isEmpty()){
            const [x, y] = q.pop();
            
            for(let i = 0; i < 4; i++){
            const nx = x + path[i][0];
            const ny = y + path[i][1];
            
            if(0 <= nx && nx < maps.length && 0 <= ny && ny < maps[0].length && visited[nx][ny] === -1 && maps[nx][ny]){
                visited[nx][ny] = visited[x][y] + 1;
                q.push([nx, ny]);
            }
        }
    }
     
        }
        
           
    BFS(0, 0);
    
    return visited[maps.length - 1][maps[0].length - 1]
}