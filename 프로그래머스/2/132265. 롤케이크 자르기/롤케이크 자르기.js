function solution(topping) {
    const chul = {};
    const bro = {};
    let [chulNum, broNum] = [0, 0];
    let answer = 0;
    
    for(let i = 0; i < topping.length; i++){
        chul[topping[i]] ? chul[topping[i]]++ : chul[topping[i]] = 1;
    }
    
    chulNum = Object.values(chul).length
    
    for(kind of topping){
        chul[kind]--;
        if(chul[kind] === 0){
            chulNum--;
        }
        bro[kind] ? bro[kind]++ : bro[kind] = 1;
        if(bro[kind] === 1){
            broNum++;
        }
        if(chulNum === broNum){
            answer++;
        }
    }
    return answer;
}