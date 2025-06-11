function solution(n, s, a, b, fares) {
    let answer = 0;
    
    const distance = Array.from({length:n + 1}, () => Array(n + 1).fill(Infinity));
    
    for(let i = 1; i <= n; i++){
        distance[i][i] = 0;
    }
    
    for(const [c, d, f] of fares){
        distance[c][d] = f
        distance[d][c] = f
    }
    
    for(let k = 1; k <= n; k++){
        for(let i = 1; i <= n; i++){
            for(let j = 1; j <= n; j++){
                distance[i][j] = Math.min(distance[i][j], distance[i][k] + distance[k][j]);
            }
        }
    }
    
    answer += distance[s][a] + distance[s][b];
    
    for(let i = 1; i <= n; i++){
        answer = Math.min(answer, distance[s][i] + distance[i][a] + distance[i][b]);
    }

    
    return answer;
}