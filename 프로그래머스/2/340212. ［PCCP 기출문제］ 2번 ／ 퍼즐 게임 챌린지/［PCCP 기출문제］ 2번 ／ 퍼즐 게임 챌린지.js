function solution(diffs, times, limit) {
    let answer = 0;
    
    
    // 주의: 지금 퍼즐 못풀어서 다시 돌아가면 이전 퍼즐을 풀 때 무조건 풀 수 있다.
    // 결국 => 한번 틀릴때마다 time_cur + time_prev
    // => 최종적으로 풀려면 (diff - level) * 위의 값 + time_cur
    
    function puzzle(index, level, diff){
        let result = 0;
        if(diff > level){
            result = (diff - level) * (times[index] + times[index - 1]) + times[index];
        }
        else{
            result = times[index];
        }
        
        return result;
    }
    
    // 구하는거 : 숙련도의 최소값(제한시간 내에 퍼즐 해결할 수 있어야함)
    
    let [start, end] = [1, [...diffs].sort((a, b) => b - a)[0]];
    
    while(start <= end){
        const level = Math.floor((start + end) / 2);
        
        let time = 0;
        for(let i = 0; i < diffs.length; i++){
            time += puzzle(i, level, diffs[i]);
        }
        
        if(limit >= time){
            answer = level;
            end = level - 1;
        }
        else{
            start = level + 1;
        }
    }
    return answer;
}