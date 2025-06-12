function solution(targets) {
    let answer = 1;

    targets.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    let [curStart, curEnd] = targets[0];
    
    for(let i = 1; i < targets.length; i++){
        const [start, end] = targets[i];
        
        // 범위안에 속해있으면
        if(start < curEnd){
            if(end < curEnd){
               curEnd = end;
            }
            continue;
        }
        // 새로운 범위면(겹치지 않으면)
        else{
            answer++;
            [curStart, curEnd] = targets[i];
        }
        
    }
    
    
    return answer;
}