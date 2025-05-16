function solution(prices) {
    const stack = [];
    const answer = Array.from({length:prices.length}, (_, i) => prices.length - i - 1);
    
    for(let i = 0; i < prices.length; i++){
        const price = prices[i];
        while(stack.length > 0 && stack[stack.length - 1][1] > price){
            answer[stack[stack.length - 1][0]] = i - stack[stack.length - 1][0];
            stack.pop();
        }
        stack.push([i, price])
    }
    
    return answer;
}