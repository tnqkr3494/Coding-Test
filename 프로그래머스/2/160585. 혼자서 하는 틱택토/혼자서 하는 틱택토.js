function solution(board) {
    let answer = 0;
    let [oCount, xCount] = [0, 0];
    let [oWin, xWin] = [false, false]
    
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(board[i][j] === "O") oCount++;
            else if(board[i][j] === "X") xCount++;
        }
    }
    
    
    // 누가가 이기는 상황인지 확인하는 함수
    function win(){
        for(let i = 0; i < 3; i++){
            if(board[i] === "OOO"){
                oWin = true;
            }
            else if(board[i] === "XXX"){
                xWin = true;
            }
        }
        for(let i = 0; i < 3; i++){
            let temp = "";
            for(let j = 0; j < 3; j++){
                temp += board[j][i]
            }
            if(temp === "OOO"){
                oWin = true;
            }
            else if(temp === "XXX"){
                xWin = true;
            }
        }
        // 대각
        let left = "";
        let right = "";
        for(let i = 0; i < 3; i++){
            left += board[i][i];
            right += board[i][2 - i];
        }
        if(left === "OOO" || right === "OOO"){
            oWin = true;
        }
        else if(left === "XXX" || right === "XXX"){
            xWin = true;
        }
        
    }
    
    win();
    
    if(oCount === xCount){
        if(!oWin) answer = 1;
    }
    else if(oCount - xCount === 1){
        if(oWin && !xWin || !oWin && !xWin) answer = 1;
    }


    return answer;
}