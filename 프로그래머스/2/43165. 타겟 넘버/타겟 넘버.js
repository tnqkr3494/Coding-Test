function solution(numbers, target) {
    let answer = 0;
    
    function sol(depth, result){
        if(depth === numbers.length){
            if(result === target){
                answer++;
            }
            return;
        }
        
        
        sol(depth + 1, result + numbers[depth]);
        sol(depth + 1, result - numbers[depth]);
        
        
    }
    
    sol(1, numbers[0]);
    sol(1, -numbers[0]);
    
    return answer;
}