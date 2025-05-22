function solution(number, k) {
    const arr = number.split("").map(Number);
    const stack = [arr[0]];
    
    for(let i = 1; i < arr.length; i++){
        if(stack.length + arr.length - i === arr.length - k){
            stack.push(arr[i]);    
        }
        else{
            while(stack.length > 0 && stack.at(-1) < arr[i]){
                stack.pop();
                if(stack.length + arr.length - i === arr.length - k){
                    break;
                }
                
        }    
            stack.push(arr[i]);
        }
        
    }
    
    return stack.slice(0, arr.length - k).join("");
}