function solution(arrayA, arrayB) {
    let answer = 0;
    
    function gcd(a, b){
        if(a % b === 0){
            return b;
        }
        return gcd(b, a % b);
    }
    
    let gcdA = arrayA[0];
    let gcdB = arrayB[0];
    
    for(const a of arrayA){
        gcdA = gcd(gcdA, a);
    }
    for(const b of arrayB){
        gcdB = gcd(gcdB, b);
    }
    
    function check(arr, gc){
        for(const num of arr){
            if(num % gc === 0){
                return false;
            }
        }
        return true;
    }

    
    
    if(check(arrayA, gcdB)){
        answer = Math.max(answer, gcdB);
    }
    
    if(check(arrayB, gcdA)){
        answer = Math.max(answer, gcdA);
    }
   
    
    
    return answer;
}