function solution(board, skill) {
    let answer = 0;
    const [n, m] = [board.length, board[0].length];
    
    // type 1 공격, 2 회복
    // degree value
    
    
    // 마지막에 한번에 반영해야 시간 줄일 수 있음
    
    const magic = Array.from({length:n + 1}, () => Array(m + 1).fill(0));
    
    for(const [type, r1, c1, r2, c2, degree] of skill){
        const value = type === 1 ? -degree : degree;
        magic[r1][c1] += value;
        magic[r1][c2 + 1] -= value;
        magic[r2 + 1][c1] -= value;
        magic[r2 + 1][c2 + 1] += value;
    }
    
    // 누적합
    for(let i = 0; i < m + 1; i++){
        let temp = magic[0][i]
        for(let j = 1; j < n + 1; j++){
            temp += magic[j][i]
            magic[j][i] = temp;
        }
    }
    
    for(let i = 0; i < n + 1; i++){
        let temp = magic[i][0]
        for(let j = 1; j < m + 1; j++){
            temp += magic[i][j];
            magic[i][j] = temp;
        }
    }
    
    for(let i = 0; i < n; i++){
        for(let j = 0; j < m; j++){
            board[i][j] += magic[i][j]
            if(board[i][j] > 0){
                answer++;
            }
        }
    }
    
    return answer;
}