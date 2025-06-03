function solution(s){
    let answer = 1;
    const n = s.length;
    const dp = Array.from({length:n}, () => Array(n).fill(false));
    
    // 자기자신
    for(let i = 0; i < n; i++){
        dp[i][i] = true;
    }
    // 나랑 옆에 비교
    for(let i = 0; i < n - 1; i++){
        if(s[i] === s[i + 1]){
            dp[i][i + 1] = true;
            answer = 2;
        }
    }
    
    // 나머지
    for(let i = n - 3; i >= 0; i--){
        for(let j = i + 2; j < n; j++){
            if(s[i] === s[j] && dp[i + 1][j - 1]){
                dp[i][j] = true;
                answer = Math.max(answer, j - i + 1);
            }
        }
    }
    
    return answer;
}