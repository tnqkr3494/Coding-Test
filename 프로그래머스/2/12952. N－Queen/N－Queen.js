function solution(n) {
    let answer = 0;
    const row = Array.from({length:n}, () => -1);
    
    function check(depth, col){
        if(depth === 0){
            return true;
        }
        else{
            for(let i = 0; i < depth; i++){
                // 같은 열이거나, 대각선에 위치한 경우
                if(row[i] === row[depth] || Math.abs(depth - i) === Math.abs(row[i] - row[depth])){
                    return false;
                }
            }
        }
        return true;
    }
    
    function sol(depth){
        // 다 놓는데 성공하면
        if(depth === n){
            answer += 1;
            return;
        }
        
        // 다음행에 퀸을 넣을수 있는 경우의 수가 존재하는지 확인
        for(let i = 0; i < n; i++){
            // i번째 열에 퀸을 넣어보기, 가능하면 재귀 타고 들어가기
            row[depth] = i;
            if(check(depth, i)){
                sol(depth + 1);
            }
            row[depth] = -1;
        }
        
    }
    
    sol(0);
    
    
    return answer;
}