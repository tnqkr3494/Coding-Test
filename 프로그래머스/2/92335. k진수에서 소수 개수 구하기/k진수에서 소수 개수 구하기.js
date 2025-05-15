function solution(n, k) {
    let answer = 0;
    // 소수 확인 함수
    function check(num){
        if(num <= 1){
            return false;
        }
        for(let i = 2; i <= Math.sqrt(num); i++){
            if(num % i === 0){
                return false;
            }
        }
        return true;
    }
    
    const ch = n.toString(k).split("0");
    
    for(const e of ch){
        if (e === "") continue;
        if(check(Number(e))){
            answer++;
        }
    }
    return answer;   
}