function solution(n) {
    const answer = Array.from({length:n}, (_, i) => Array(i + 1).fill(0));
    let [x, y] = [0, 0];
    const path = [[1, 0], [0, 1], [-1, -1]];
    let dir = 0;
    let num = 1;
    
    while(num <= (n * (n + 1)) / 2){
        answer[x][y] = num++;
        const nx = x + path[dir][0]
        const ny = y + path[dir][1]
        
        if(0 <= nx && 0 <= ny && nx < n && answer[nx][ny] === 0){
            [x, y] = [nx, ny];
        }
        else{
            dir = (dir + 1) % 3;
            [x, y] = [x + path[dir][0], y + path[dir][1]];
        }
    }
    
    
    return answer.flat();
}