function solution(land) {
    const dp = [...land];
    
    for(let i = 1; i < land.length; i++){
        for(let j = 0; j < 4; j++){
            let maxVal = -1;
            for(let k = 0; k < 4; k++){
                if(k !== j){
                    maxVal = Math.max(maxVal, dp[i - 1][k]);
                }
            }
            dp[i][j] += maxVal;
        }
    }
    
    return Math.max(...dp[land.length - 1]);
}