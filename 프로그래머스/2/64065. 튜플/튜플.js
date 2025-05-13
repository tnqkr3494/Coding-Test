function solution(s) {
    const answer = [];
    const check = [];
    let temp = [];
    let ch = "";
    for(let i = 2; i < s.length - 1; i++){
        if(s[i] !== "{" && s[i] !== "}" && s[i] !== ","){
            ch += s[i];
        }
        else if(s[i] === "," && ch !== ""){
            temp.push(Number(ch));
            ch = "";
        }
        else if(s[i] === "}"){
            temp.push(Number(ch));
            check.push(temp);
            temp  = [];
            ch = "";
        }
    }
    
    check.sort((a, b) => a.length - b.length)
    const visited = new Set();
    
    for(let i = 0; i < check.length; i++){
        for(let j = 0; j < check[i].length; j++){
            if(!visited.has(check[i][j])){
                answer.push(check[i][j]);
                visited.add(check[i][j]);
            }
        }
    }
    
    return answer;
    
}