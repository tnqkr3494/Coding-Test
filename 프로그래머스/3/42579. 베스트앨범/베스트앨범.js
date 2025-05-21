function solution(genres, plays) {
    const answer = [];
    const check = {};
    
    for(let i = 0; i < genres.length; i++){
        check[genres[i]] ? check[genres[i]] += plays[i] : check[genres[i]] = plays[i]
    };
    
    const temp = plays.map((v, i) => [check[genres[i]], v, i, genres[i]]);
    
    temp.sort((a, b) => b[0] - a[0] || b[1] - a[1] || a[2] - b[2]);
    
    let cnt = 0;
    let checkGenre = "";
    for(let i = 0; i < temp.length; i++){
        const [_, __, num, g] = temp[i];
        if(checkGenre === g){
            cnt++;
        }
        else{
            checkGenre = g;
            cnt = 0;
        }
        if(cnt < 2){
            answer.push(num);
        }
    }
    
    
    return answer;
}