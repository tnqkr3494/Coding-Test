function solution(user_id, banned_id) {
    let answer = new Set();
    
    function check(arr){
        for(let i = 0; i < arr.length; i++){
            if(arr[i].length !== banned_id[i].length){
                return false;
            }
            for(let j = 0; j < arr[i].length; j++){
                if(banned_id[i][j] === "*") continue;
                else if(arr[i][j] !== banned_id[i][j]){
                    return false;
                }
            }
            
        }
        return true;
    }
    
    function sol(depth, result, visited){
        if(depth === banned_id.length){
            check(result) ? answer.add([...result].sort().join("")) : null;
            return;
        }
        
        for(let i = 0; i < user_id.length; i++){
            if(visited[i]) continue;
            result.push(user_id[i]);
            visited[i] = true;
            sol(depth + 1, result, visited);
            result.pop();
            visited[i] = false;
        }
        
    }
    
    sol(0, [], Array(user_id.length).fill(false));
    
    return answer.size;
}