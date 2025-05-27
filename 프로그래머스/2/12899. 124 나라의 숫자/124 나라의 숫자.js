function solution(n) {
    let answer = "";
    const check = ["1", "2", "4"];
    
    while(n > 0){
        n -= 1;
        answer = check[n % 3] + answer;
        n = Math.floor(n / 3);
    }
    
    return answer;
    
}