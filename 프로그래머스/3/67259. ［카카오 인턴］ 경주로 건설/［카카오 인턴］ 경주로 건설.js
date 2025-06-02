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

const path = [[1, 0], [-1, 0], [0, 1], [0, -1]];

function solution(board) {
    const n = board.length;
    const visited = Array.from({length:n}, () => Array.from({length:n}, () => Array(4).fill(Infinity)));
    
    // 꺾였는지 아닌지 확인해야하는 추가 dir 원소 있어야함
    
    // 3차원 배열을 염두해야함. (마지막 칸에는 총 4가지 방법이 가능한거지)
    
    function BFS(){
        const q = new Queue();
        q.push([0, 0, 0]);
        for(let i = 0; i < 4; i++){
            visited[0][0][i] = 0;
        }
        
        while(!q.isEmpty()){
            const [x, y, dir] = q.pop();
            for(let i = 0; i < 4; i++){
                const [nx, ny] = [x + path[i][0], y + path[i][1]];
                if(0 <= nx && nx < n && 0 <= ny && ny < n && board[nx][ny] === 0){
                    let check = 0;
                    if(i === dir || (x === 0 && y === 0)){
                        check = visited[x][y][dir] + 100
                    }
                    else{
                        check = visited[x][y][dir] + 600;
                    }
                    
                    if(check < visited[nx][ny][i]){
                        q.push([nx, ny, i]);
                        visited[nx][ny][i] = check;
                    }
                }
            }
        }
    }
    BFS()
    
    return Math.min(...visited[n - 1][n - 1]);
}