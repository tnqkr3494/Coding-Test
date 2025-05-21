function solution(numbers) {
    let answer = 0;
    const num = numbers.split("").map(Number);
    const temp = new Set();
    const result = []
    const visited = Array(num.length).fill(false);
    
    function check(n){
        if(temp.has(n) || n === 1 || n === 0){
            return false;
        }
        
        for(let i = 2; i <= Math.sqrt(n); i++){
            if(n % i === 0){
                return false;
            }
        }
        
        temp.add(n);
        return true
    }
    
    
    function per(result, visited){
        
        if(result.length <= num.length && 0 < result.length){
            check(Number(result.join(""))) && answer++;
        }
        
        for(let i = 0; i < num.length; i++){
            if(visited[i]) continue;
            visited[i] = true;
            result.push(num[i])
            per(result, visited);
            result.pop();
            visited[i] = false;
        }
    }
    per(result, visited);
   
    return answer;
}