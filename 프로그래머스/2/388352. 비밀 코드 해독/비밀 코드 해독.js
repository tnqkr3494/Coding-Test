function solution(n, q, ans) {
    let answer = 0;
    
    function check(arr){
        for(let i = 0; i < q.length; i++){
            const intersection = arr.filter(x => q[i].includes(x)).length;
              if (intersection !== ans[i]) {
                return false;
              }
        }
        return true;
    }
    
    
    function comb(start, result){
        if(result.length === 5){
            // 비교 로직
            const compare = check(result);
            compare ? answer++ : null;
            return;
        }
        
        for(let i = start; i <= n; i++){
            result.push(i);
            comb(i + 1, result);
            result.pop();
        }
    }
    
    comb(1, []);
    
    return answer;
}