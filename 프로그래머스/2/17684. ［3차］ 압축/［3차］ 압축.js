function solution(msg) {
    let count = 27;
    const answer = [];
    const dic = {};
    
    let idx = 0;
    let ch = "";
    
    while(idx < msg.length){
        ch += msg[idx];
        if(dic[ch] || ch.length === 1){
            idx++;
        }
        else{
            dic[ch] = count;
            ch = ch.slice(0, -1);
            if(ch.length === 1){
                answer.push(ch.charCodeAt() - "A".charCodeAt() + 1);
            }
            else{
                answer.push(dic[ch]); 
            }
            
            count++;
            ch = "";
        }
    }
    if(ch.length === 1){
        answer.push(ch.charCodeAt() - "A".charCodeAt() + 1);
    }
    else{
        answer.push(dic[ch]);
    }
    
    return answer;
}