function can(want, number, currentCount){
    for(let i = 0; i < want.length; i++){
        if((currentCount[want[i]] || 0) < number[i]){
            return 0;
        }
    }
    return 1;
}

function solution(want, number, discount) {
    let answer = 0;
    
    for(let i = 0; i <= discount.length - 10; i++){
        const currentCount = {};
        // 10일 동안의 할인 품목 카운트
        for(let j = 0; j < 10; j++){
            const item = discount[i + j];
            currentCount[item] = (currentCount[item] || 0) + 1;
        }
        answer += can(want, number, currentCount);
    }
    
    return answer;
}
