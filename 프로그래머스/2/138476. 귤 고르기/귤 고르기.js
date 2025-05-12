function solution(k, tangerine) {
    const count = {};
    let answer = 0;
    
    for(e of tangerine){
       count[e] ? count[e]++ : count[e] = 1;
    }
    
    const check = Object.values(count)
    
    check.sort((a, b) => b - a);
    
    for(num of check){
        k -= num;
        answer++;
        if(k <= 0){
            return answer
        }
    }
    
}