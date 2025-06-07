function solution(n, results) {
    let answer = 0;
    
    const distance = Array.from({length:n + 1}, () => Array(n + 1).fill(0));
    
    for(let i = 0; i <= n; i++){
        distance[i][i] = 0;
    }
    
    for(const [win, lose] of results){
        distance[lose][win] = -1;
        distance[win][lose] = 1;
    }
    
    for(let k = 1; k <= n; k++){
        for(let i = 1; i <= n; i++){
            for(let j = 1; j <= n; j++){
                if(distance[i][k] === 1 && distance[k][j] === 1){
                    distance[i][j] = 1;
                    distance[j][i] = -1;
                }
                else if(distance[i][k] === -1 && distance[k][j] === -1){
                    distance[i][j] = -1;
                    distance[j][i] = 1;
                }
            }
        }
    }
    
    for(let i = 1; i <= n; i++){
        let cnt = 0;
        for(let j = 1; j <= n; j++){
            if(distance[i][j] !== 0){
                cnt++;
            }
        }
        if(cnt === n - 1){
            answer++;
        }
    }
    
    
    
    return answer;
}