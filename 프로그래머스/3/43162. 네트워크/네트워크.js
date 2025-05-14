function solution(n, computers) {
    let answer = 0;
    const visited = Array(n).fill(false);
    
    function DFS(x){
        visited[x] = true;
        
        for(let i = 0; i < n; i++){
            if(computers[x][i] === 1 && !visited[i]){
                DFS(i);
            }
        }
    }
    
    for(let i = 0; i < n; i++){
        // DFS
        if(!visited[i]){
            DFS(i);
            answer++;
        }
    }
    
    return answer;
}