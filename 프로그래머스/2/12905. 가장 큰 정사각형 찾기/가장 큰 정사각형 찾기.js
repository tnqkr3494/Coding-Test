function solution(board){
    const [w, h] = [board[0].length, board.length];
    let answer = -1;
    
    const dp = Array.from({length:h}, () => Array(w).fill(0));
    // 겉에부터 처리
    
    for(let i = 0; i < h; i++){
        for(let j = 0; j < w; j++){
            if(i === 0 || j === 0){
                dp[i][j] = board[i][j];
                answer = Math.max(answer, dp[i][j]);
            }
            else if(board[i][j] === 1){
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
                answer = Math.max(answer, dp[i][j]);
            }
        }
    }
    
    return answer ** 2;
}