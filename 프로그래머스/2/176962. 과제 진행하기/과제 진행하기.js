function calc(time){
    const [hour, min] = time.split(":").map(Number);
    
    return hour * 60 + min;
}

function solution(plans) {
    const answer = [];
    
    plans.sort((a, b) => a[1].localeCompare(b[1]));
    let cur = calc(plans[0][1]);
    const stack = [];
    
    for(let i = 0; i < plans.length; i++){
        let [name, start, playtime] = plans[i];
        start = calc(start);
        playtime = Number(playtime);
        
        // 멈춘 과제 리스트 확인
        while(stack.length > 0){
            let [newName, newPlaytime] = stack.pop();
            // 만약 plan[i]의 시작 시간을 초과해버리면 다시 넣기(시간 빼고)
            if(cur + newPlaytime > start){
                stack.push([newName, newPlaytime - (start - cur)]);
                break;
            }
            // 초과하지 않는 경우 그냥 진행
            else{
                answer.push(newName);
                cur += newPlaytime;
            }
        }
        
        cur = start;
        stack.push([name, playtime]);
    }
    
    while(stack.length > 0){
        answer.push(stack.pop()[0]);
    }

          
    return answer;
}