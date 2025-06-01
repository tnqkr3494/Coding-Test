function sol(arr){
    const dp = [...arr];
    let max = dp[0];
    for(let i = 1; i < arr.length; i++){
        dp[i] = Math.max(dp[i], dp[i] + dp[i - 1]);
        max = Math.max(max, dp[i]);
    }
    
    return max;
}
function solution(sequence) {
    let answer = -1;
    
    // -1로 시작 
    const seq1 = [];
    // 1로 시작
    const seq2 = [];
    
    for(let i = 0; i < sequence.length; i++){
        if(i % 2 === 0){
            seq1.push(-sequence[i])
            seq2.push(sequence[i])
        }
        else{
            seq1.push(sequence[i])
            seq2.push(-sequence[i])
        }
    }
    
    
    answer = Math.max(sol(seq1), sol(seq2));

    
    return answer;
}