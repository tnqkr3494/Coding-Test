function solution(n, t, m, p) {
    let check = "";
    let answer = "";
    for(let i = 0; i <= t * m; i++){
        check += i.toString(n).toUpperCase();
    }
    
    for(let i = p - 1; i < check.length; i += m){
        answer += check[i];
        if(answer.length === t){
            break;
        }
    }
    return answer;   
}