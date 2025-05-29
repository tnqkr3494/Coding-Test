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
    const answer = [];
    const [w, h] = [maps[0].length, maps.length]
    const visited = Array.from({length:h}, () => Array(w).fill(false));
    const path = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    
    function BFS(x, y){
        let result = 0;
        const q = new Queue();
        visited[x][y] = true;
        q.push([x, y]);
        result += Number(maps[x][y]);
        while(!q.isEmpty()){
            const [x, y] = q.pop();
            for(let i = 0; i < 4; i++){
                const nx = x + path[i][0]
                const ny = y + path[i][1]
                if(0 <= nx && nx < h && 0 <= ny && ny < w && !visited[nx][ny] && maps[nx][ny] !== "X"){
                    visited[nx][ny] = true;
                    result += Number(maps[nx][ny]);
                    q.push([nx, ny]);
                    
                }
            }
        }
        return result;
    }
    
    for(let i = 0; i < h; i++){
        for(let j = 0; j < w; j++){
            if(!visited[i][j] && maps[i][j] !== "X"){
                answer.push(BFS(i, j));
            }
        }
    }
    
    if(answer.length > 0){
        return answer.sort((a, b) => a - b);    
    }
    else{
        return [-1];
    }
    
    
}