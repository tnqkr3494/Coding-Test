function solution(info, edges) {
    let answer = 0;
    const n = info.length;
    const graph = Array.from({length:n}, () => []);
    
    const visited = Array.from({length:n}, () => false);
    visited[0] = true;
    
    
    function DFS(sheep, wolf){
        if(wolf >= sheep) return;
        else {
            answer = Math.max(answer, sheep)
        };
        
        // 이렇게 해야 return 할 때 생기는 양이 사라지는 현상을 방지할 수 있음. 그니까 같은
        // 호출 단계에서 갈 수 있는 방향은 같이 뻗어나가는 느낌.
        for(const [a, b] of edges){
            if(visited[a] && !visited[b]){
                visited[b] = true;
                if(info[b] === 0){
                    DFS(sheep + 1, wolf)
                }
                else{
                    DFS(sheep, wolf + 1);
                }
                visited[b] = false;
            }
        }
    }
    
    DFS(1, 0)
    
    return answer;
}