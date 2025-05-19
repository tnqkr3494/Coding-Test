function solution(n, s) {
    // 자연수 n개로 이루어진 원소합이 s가 되는 중복 집합중 곱이 최대
    const answer = [];
    let cnt = n;
    
    if(n > s) return [-1];
    
    while(cnt > 1){
        const check = Math.floor(s / cnt);
        answer.push(check);
        s -= check;
        cnt--;
    }
    answer.push(s)
    return answer;
}