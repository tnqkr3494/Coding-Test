function solution(sequence, k) {
    let answer = [0, 0];
    let [start, end] = [0, 0];
    let result = sequence[0];
    let len = Infinity;
    
    while(end < sequence.length){
        if(result === k && len > end - start){
            len = end - start;
            answer = [start, end]
        }
        
        if(result < k){
            end += 1;
            result += sequence[end];
        }
        else{
            result -= sequence[start];
            start += 1;
        }
    }

    return answer;
}