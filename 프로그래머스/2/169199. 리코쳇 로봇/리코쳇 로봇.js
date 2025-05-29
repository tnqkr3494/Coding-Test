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

function solution(board) {
    let answer = 0;
    const [w, h] = [board[0].length, board.length];
    const path = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let [startX, startY] = [0, 0];
    const visited = Array.from({length:h}, () => Array(w).fill(-1));
    for(let i = 0; i < h; i++){
        for(let j = 0; j < w; j++){
            if(board[i][j] === "R"){
                [startX, startY] = [i, j];
            }
        }
    }
    
    function sol(){
        const q = new Queue();
        q.push([startX, startY]);
        visited[startX][startY] = 0;
        while(!q.isEmpty()){
            const [x, y] = q.pop();
            if(board[x][y] === "G"){
                return visited[x][y];
            }
            for(let i = 0; i < 4; i++){
                // 미끌어져 이동하는 로직
                let [nx, ny] = [x, y];
                while(true){
                    nx += path[i][0]
                    ny += path[i][1]
                    if(0 > nx || nx >= h || 0 > ny || ny >= w || board[nx][ny] === "D"){
                        nx -= path[i][0]
                        ny -= path[i][1]
                        break;
                    }
                }
                if(visited[nx][ny] === -1){
                    q.push([nx, ny])
                    visited[nx][ny] = visited[x][y] + 1;
                }
            }
        }
        return -1
    }

    return sol();
}