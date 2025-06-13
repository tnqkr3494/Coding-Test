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

function solution(land) {
    let answer = 0;
    const [n, m] = [land.length, land[0].length];
    const visited = Array.from({length:n}, () => Array(m).fill(false));
    const path = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    
    function BFS(x, y){
        const q = new Queue();
        let [start, end] = [y, y];
        let cnt = 1;
        visited[x][y] = true;
        q.push([x, y]);
        
        while(!q.isEmpty()){
            const [x, y] = q.pop();
            for(let i = 0; i < 4; i++){
                const [nx, ny] = [x + path[i][0], y + path[i][1]];
                if(0 <= nx && nx < n && 0 <= ny && ny < m && !visited[nx][ny] && land[nx][ny] === 1){
                    [start, end] = [Math.min(start, ny), Math.max(end, ny)];
                    visited[nx][ny] = true;
                    q.push([nx, ny]);
                    cnt++;
                }
            }
        }
        return [start, end, cnt];
    }
    
    const result = [];
    
    for(let i = 0; i < n; i++){
        for(let j = 0; j < m; j++){
            if(land[i][j] === 1 && !visited[i][j]){
                result.push(BFS(i, j));
            }
        }
    }
    
    for(let i = 0; i < m; i++){
        let temp = 0;
        for(const [oilStart, oilEnd, oil] of result){
            if(oilStart <= i && oilEnd >= i){
                temp += oil;
            }
        }
        answer = Math.max(answer, temp);
    }
    
    
    
    return answer;
}