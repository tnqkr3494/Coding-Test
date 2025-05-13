let answer = -1;

function sol(result, dungeons, k){
    let count = 0;
    for(const num of result){
        const [require, cost] = dungeons[num];
        if(k >= require){
            k -= cost;
            count++;
        }
        else{
            break;
        }
    }
    
    return count
}

function permutations(depth, visited, result, n, dungeons, k){
    if(depth === n){
        // 체크
        answer = Math.max(answer, sol(result, dungeons, k));
    }
    
    
    for(let i = 0; i < n; i++){
        if(visited[i]) continue;
        visited[i] = true;
        result.push(i);
        permutations(depth + 1, visited, result, n, dungeons, k);
        visited[i] = false;
        result.pop();
    }
    
}

function solution(k, dungeons) {
    permutations(0, Array(dungeons.length).fill(false), [], dungeons.length, dungeons, k);
    
    return answer
}
