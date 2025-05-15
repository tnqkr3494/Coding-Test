function solution(numbers) {
    const answer = [-1];
    const stack = [numbers[numbers.length - 1]];
    
    for(let i = numbers.length - 2; i >= 0; i--){
        while(stack.length > 0 && stack[stack.length - 1] <= numbers[i]){
            stack.pop();
        }
        if(stack.length > 0){
            answer.push(stack[stack.length - 1])    ;
        }
        else{
            answer.push(-1);
        }
        
        stack.push(numbers[i]);
    }
    
    
    return answer.reverse();
}