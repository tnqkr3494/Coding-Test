function solution(graph) {
    const answer = [0, 0];
    
    function check(x, y, len){
        const temp = graph[x][y];
        for(let i = x; i < x + len; i++){
            for(let j = y; j < y + len; j++){
                if(temp !== graph[i][j]){
                    return false;
                }
            }
        }
        return true;
    }
    
    function zip(x, y){
        const temp = graph[x][y];
        answer[temp] += 1;
    }
    
    // 재귀
    function sol(x, y, len){
        const flag = check(x, y, len);
        
        if(flag){
            zip(x, y);
            return;
        }
        
        else{
            sol(x, y, len / 2);
            sol(x + len / 2, y, len / 2);
            sol(x, y + len / 2, len / 2);
            sol(x + len / 2, y + len / 2, len / 2);
        }
    }
    
    sol(0, 0, graph.length);

    
    return answer;
}