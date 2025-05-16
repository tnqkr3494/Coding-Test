function solution(order) {
    let answer = 0;
    const stack = [];
    const box = Array.from({length:order.length}, (_, i) => i + 1);
    let idx = 0; // box 인덱스
    let check = 0; // order 인덱스
    
    while(idx < box.length){
        if(box[idx] === order[check]){
            check++;
            idx++;
            answer++;
        }
        else if(stack.length > 0 && stack[stack.length - 1] === order[check]){
            check++;
            stack.pop();
            answer++;
        }
        else{
            stack.push(box[idx]);
            idx++;
        }
    }
    
    while(stack.length > 0 && stack[stack.length - 1] === order[check]){
        stack.pop();
        answer++;
        check++;
    }
    
    return answer;
    
}
