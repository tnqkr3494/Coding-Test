function solution(skill, skill_trees) {
    let answer = 0;
    const check = {};
    for(let i = 0; i < skill.length; i++){
        check[skill[i]] = i;
    }
    
    for(const tree of skill_trees){
        let idx = 0;
        let flag = true;
        
        for(let i = 0; i < tree.length; i++){
            if(check[tree[i]] >= 0){
                if(check[tree[i]] === idx){
                    idx++;
                }
                else{
                    flag = false;
                }
            }
            if(!flag) break;
        }
        if(flag) answer++;
    }
    return answer;
}