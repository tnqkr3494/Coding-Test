function sol(num, elements){
    // 슬라이딩 윈도우 활용하기
    const result = [];
    
    // 초기 윈도우 세팅
    let [start, end] = [0, num - 1];
    let check = 0;
    for(let i = start; i <= end; i++){
        check += elements[i];
    }
    result.push(check);
    
    // 슬라이딩
    
    for(let i = end + 1; i < elements.length * 2; i++){
        check -= elements[start];
        start = (start + 1) % elements.length;
        check += elements[i % elements.length];
        end = (end + 1) % elements.length;
        result.push(check);
    }
    
    return result;
}

function solution(elements) {
    let result = []
    for(let i = 1; i <= elements.length; i++){
        result.push(...sol(i, elements));
    }
    
    result.sort((a, b) => a - b)
    
    return new Set(result).size;
    
}