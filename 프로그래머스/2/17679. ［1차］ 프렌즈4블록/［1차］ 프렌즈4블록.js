function solution(m, n, board) {
    board = board.map((row) => row.split(""));
    
    while(true){
        let flag = false;
        const newGraph = board.map((row) => [...row]);
        // 폭탄
        for(let i = 0; i < m - 1; i++){
            for(let j = 0; j < n - 1; j++){
                if(board[i][j] !== "Empty" && board[i][j] === board[i][j + 1] && board[i][j] === board[i + 1][j] && board[i][j] === board[i + 1][j + 1]){
                    [newGraph[i][j], newGraph[i + 1][j], newGraph[i][j + 1], newGraph[i + 1][j + 1]] = ["Empty", "Empty", "Empty", "Empty"];
                    flag = true;
                }
            }
        }
        
        if(!flag){
            break;
        }

        board = newGraph;
        
        for(let i = 0; i < n; i++){
            let bottom = -1;
            for(let j = m - 1; j >= 0; j--){
                if(bottom === -1 && board[j][i] === "Empty"){
                    bottom = j;
                }
                else if(bottom !== -1 && board[j][i] !== "Empty"){
                    board[bottom][i] = board[j][i];
                    bottom--;
                    board[j][i] = "Empty";
                }
            }
        }
    }
    return board.flat().filter((e) => e === "Empty").length;
}