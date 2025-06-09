function solution(relation) {
    const answer = [];
    const combinations = [];
    const n = relation[0].length;
    
    // 조합을 전부 확인
    function comb(start, result, num){
        if(result.length === num){
            combinations.push([...result]);
            return;
        }
        for(let i = start; i < n; i++){
            result.push(i);
            comb(i + 1, result, num);
            result.pop();
        }
    }
    for(let i = 1; i <= n; i++){
        comb(0, [], i);
    }
    
    // 유일성 확인
    const unique = [];
    for(const combination of combinations){
        const group = [];
        for(let i = 0; i < relation.length; i++){
            const temp = [];
            for(let j = 0; j < combination.length; j++){
                temp.push(relation[i][combination[j]]);
            }
            group.push([...temp]);
        }
        const check = new Set();
        for(let i = 0; i < group.length; i++){
            const t = JSON.stringify(group[i]);
            if(!check.has(t)) check.add(t)
        }
        if(check.size === relation.length) unique.push(combination);
    }    
    
    // 최소성 확인
    
    for(let i = 0; i < unique.length; i++){
        let flag = true;
        
        for(let j = 0; j < answer.length; j++){
            if(answer[j].every(e => unique[i].includes(e))){
                flag = false;
               break; 
            }
        }
        
        if(flag) answer.push(unique[i])
    }
    
    
    
    
    return answer.length;
}