function solution(a) {
    let answer = 0;
    
    // 최솟값은 무조건 구할 수 있음(계속 큰거만 고르면 되니까)
    // 왼, 오 고려
    
    const leftArr = [...a]
    const rightArr = [...a]
    let check = Infinity;
    
    for(let i = 1; i < a.length; i++){
        check = Math.min(check, a[i - 1]);
        leftArr[i] = check;
    }
    check = Infinity;
    for(let i = a.length - 2; i >= 0; i--){
        check = Math.min(check, a[i + 1]);
        rightArr[i] = check;
    }
    
    for(let i = 0; i < a.length; i++){
        const arr = [leftArr[i], rightArr[i], a[i]].sort((a, b) => a - b);
        if(arr[0] === a[i] || arr[1] === a[i]){
            answer++;
        }
    }

    return answer;
}