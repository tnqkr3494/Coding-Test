function solution(triangle) {
     const dp = [...triangle];
    
    for(let i = 1; i < triangle.length; i++){
        dp[i][0] += dp[i - 1][0];
        dp[i][triangle[i].length - 1] += dp[i - 1][triangle[i - 1].length - 1];
        for(let j = 1; j < triangle[i].length - 1; j++){
            dp[i][j] += Math.max(dp[i - 1][j - 1], dp[i - 1][j]);
        }
    }
    
    return Math.max(...dp[triangle.length - 1])
}