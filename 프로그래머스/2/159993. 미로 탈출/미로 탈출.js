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
    let answer = 0;
    const path = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const [h, w] = [maps.length, maps[0].length]
    let [startX, startY] = [0, 0];
    let [ladderX, ladderY] = [0, 0];
    
    for(let i = 0; i < h; i++){
        for(let j = 0; j < w; j++){
            if(maps[i][j] === "S"){
                [startX, startY] = [i, j];
            }
            else if(maps[i][j] === "L"){
                [ladderX, ladderY] = [i, j];
            }
        }
    }
    
    function BFS(x, y, ch){
        const q = new Queue();
        const visited = Array.from({length : h}, () => Array(w).fill(-1))
        q.push([x, y]);
        visited[x][y] = 0;
        
        while(!q.isEmpty()){
            const [x, y] = q.pop();
            if(maps[x][y] === ch){
                return visited[x][y];
            }
            for(let i = 0; i < 4; i++){
                const nx = x + path[i][0];
                const ny = y + path[i][1];
                if(0 <= nx && nx < h && 0 <= ny && ny < w && visited[nx][ny] === -1 && maps[nx][ny] !== "X"){
                    visited[nx][ny] = visited[x][y] + 1;
                    q.push([nx, ny]);
                }
            }
            
        }
        return -1;
    }
    
    let check = BFS(startX, startY, "L");
    if(check === -1){
        return -1;
    }
    answer += check;
    check = BFS(ladderX, ladderY, "E");
    if(check === -1){
        return -1;
    }
    answer += check;
    
    return answer;
}