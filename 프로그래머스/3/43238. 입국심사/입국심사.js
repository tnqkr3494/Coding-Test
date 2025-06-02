function solution(n, times) {
    let answer = 0;
    let [start, end] = [0, times[0] * n];
    
    while(start <= end){
        const mid = Math.floor((start + end) / 2);
        let cnt = 0;
        
        for(const time of times){
            cnt += Math.floor(mid / time);
        }
        
        if(cnt >= n){
            answer = mid;
            end = mid - 1;
        }
        else{
            start = mid + 1;
        }
    }
    return answer;
}