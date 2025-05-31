function calc(arr, op){
    let temp = [];
    let num = "";
    for(let i = 0; i < arr.length; i++){
        if(isNaN(arr[i])){
            temp.push(num);
            num = "";
            temp.push(arr[i]);
        }
        else{
            num += arr[i];
        }
    }
    temp.push(num);
    
    while(op.length > 0){
        const newTemp = [];
        const check = op.pop();
        for(let i = 0; i < temp.length; i++){
            if(check === temp[i]){
                newTemp.push(eval(newTemp.pop() + temp[i] + temp[i + 1]))
                i++;
            }
            else{
                newTemp.push(temp[i]);
            }
        }
        temp = newTemp;
    }
    return temp[0];
}


function solution(expression) {
    let answer = -1;
    const exp = ["-", "+", "*"];
    
    function permutations(visited, result){
        if(result.length === 3){
            // answer 계산
            answer = Math.max(answer, Math.abs(calc(expression, [...result])));
            return;
        }
        
        for(let i = 0; i < 3; i++){
            if(visited[i]) continue;
            result.push(exp[i]);
            visited[i] = true;
            permutations(visited, result);
            result.pop();
            visited[i] = false;
        }
    }
    
    permutations([false, false, false], []);
    
    return answer;
}