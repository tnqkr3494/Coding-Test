function solution(citations) {
    let [start, end] = [0, Math.max(...citations)];
    let answer = 0;
    
    while(start <= end){
        const mid = Math.floor((start + end) / 2);
        let cnt = 0;
        
        for(const e of citations){
            if(e >= mid){
                cnt++;
            }
        }
        
        if(cnt >= mid){
            answer = mid;
            start = mid + 1;
        }
        
        else{
            end = mid - 1;
        }
    }
    
    return answer
    
}