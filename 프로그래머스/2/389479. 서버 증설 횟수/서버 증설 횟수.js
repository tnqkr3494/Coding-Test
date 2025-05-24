function solution(players, m, k) {
    let answer = 0;
    const server = {};
    let cur = 0;
    
    for(let i = 0; i < 24; i++){
        // 서버 반납
        if(server[i]){
            cur -= server[i];
        }
        
        if(Math.floor(players[i] / m) > cur){
            const temp = Math.floor(players[i] / m) - cur;
            answer += temp;
            cur += temp;
            server[i + k] ? server[i + k] += temp : server[i + k] = temp;
        }
    }
    
    return answer;
}