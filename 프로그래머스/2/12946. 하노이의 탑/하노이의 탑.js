function solution(n) {
    const answer = [];
    
    function hanoi(n, from, to, help){
        if(n === 1){
            answer.push([from, to]);
            return;
        }
        
        // 가장 아래 원판 빼고 우선 보조로 옮기기
        hanoi(n - 1, from, help, to);
        
        // 가장 아래 원판 to로 옮기기
        answer.push([from, to]);
        
        // 보조로 옮긴 원판 다시 to로 옮기기
        hanoi(n - 1, help, to, from);   
    }
    
    hanoi(n, 1, 3, 2);
    
    
    return answer;
}