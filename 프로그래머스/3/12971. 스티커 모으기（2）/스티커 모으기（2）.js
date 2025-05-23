function solution(sticker) {
    
    if(sticker.length === 1){
        return sticker[0];
    }
    
    // 0번째 선택
    const dp1 = sticker.slice(0, -1);
    dp1.unshift(0);
    
    
    // 1번째 선택
    const dp2 = sticker.slice(1);
    dp2.unshift(0);
    
    
    for(let i = 2; i < dp1.length; i++){
        dp1[i] = Math.max(dp1[i] + dp1[i - 2], dp1[i - 1])
    }
    
    for(let i = 2; i < dp2.length; i++){
        dp2[i] = Math.max(dp2[i] + dp2[i - 2], dp2[i - 1])
    }
    

    return Math.max(dp1.at(-1), dp2.at(-1));
}