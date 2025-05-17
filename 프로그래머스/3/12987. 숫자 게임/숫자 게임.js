function solution(A, B) {
    let answer = 0;
    A.sort((a, b) => a - b);
    B.sort((a, b) => a - b);
    
    let bIndex = 0;
    
    for(let i = 0; i < A.length; i++){
        while(bIndex < B.length){
            if(B[bIndex] > A[i]){
                answer++;
                bIndex++;
                break;
            }
            bIndex++;
        }
    }
    return answer;
}