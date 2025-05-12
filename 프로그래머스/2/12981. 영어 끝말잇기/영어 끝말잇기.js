function solution(n, words) {
    let answer = [0, 0];
    const visited = new Set();
    
    let check = words[0]
    visited.add(words[0])
    if(check.length === 1){
        return [1, 1];
    }
    
    for(let i = 1; i < words.length; i++){
        if(words[i].length === 1 || visited.has(words[i]) || check[check.length - 1] !== words[i][0]){
         return [i % n + 1, Math.ceil((i + 1) / n)]   
        }
        visited.add(words[i])
        check = words[i]
    }

    return [0, 0];
}