function correct(arr){
    const stack = [];
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === "("){
            stack.push(arr[i]);
        }
        else{
            if(stack.length > 0){
                stack.pop();
            }
            else{
                return false;
            }
        }
    }
    return stack.length === 0;
}

function balance(arr){
    let [o, c] = [0, 0];
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === "("){
            o += 1;
        }
        else{
            c += 1;
        }
        
        if(o > 0 && c > 0 && o === c){
            return [arr.slice(0, i + 1), arr.slice(i + 1)];
        }
    }
    return [arr, ""];
}

function solution(p) {
    
    if(p === "") return "";
    
    if(correct(p)) return p;
    
    else{
        // u, v로 분리하기
        let [u, v] = balance(p);
        if(correct(u)) return u + solution(v);
        
        else{
            let temp = "(";
            temp += solution(v);
            temp += ")";
            
            for(let i = 1; i < u.length - 1; i++){
                if(u[i] === "("){
                    temp += ")"
                }
                else{
                    temp += "(";
                }
            }
            return temp;
        }
    }
}