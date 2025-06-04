function solution(s) {
    let answer = Infinity;
    
    if(s.length === 1){
        return 1;
    }
    
    for(let i = 1; i <= Math.floor(s.length / 2); i++){
        // 단위 i 만큼
        let prev = s.slice(0, i);
        let cnt = 1;
        let newArr = "";
        
        for(let j = i; j < s.length; j += i){
            let cur = s.slice(j, j + i);
            if(prev === cur){
                cnt++;
            }
            else{
                cnt > 1 ? newArr += String(cnt) + prev : newArr += prev;
                prev = cur;
                cnt = 1;
            }
        }
        cnt > 1 ? newArr += String(cnt) + prev : newArr += prev;
        answer = Math.min(answer, newArr.length);
    }
    
    
    return answer;
}