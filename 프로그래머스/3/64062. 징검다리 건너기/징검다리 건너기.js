function solution(stones, k) {
    let answer = 0;
    let [start, end] = [0, 200000000];
    
    while(start <= end){
        const mid = Math.floor((start + end) / 2);
        
        let cnt = 0;
        let flag = true;
        for(const stone of stones){
            if(mid > stone){
                cnt++;
            }
            else{
                cnt = 0;
            }
            if(cnt >= k){
                flag = false;
                break;
            }
        }
        
        if(flag){
            answer = mid;
            start = mid + 1;
        }
        else{
            end = mid - 1;
        }
    }
    
    return answer;
}