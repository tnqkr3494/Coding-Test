function solution(scores) {
    const wan = scores[0];
    scores.sort((a, b) => b[0] - a[0] || a[1] - b[1]);
    console.log(scores);
    
    const temp = [];
    let [workMax, personMax] = scores[0]
    
    for(const [work, person] of scores){
        if(work < workMax && person < personMax){
            if(wan[0] === work && wan[1] === person){
                return -1;
            }
            continue;
        }
        
        if(personMax < person){
            [workMax, personMax] = [work, person];
        }
        temp.push([work, person])
    }
    
    const plusResult = temp.map((e) => e[0] + e[1]).sort((a, b) => b - a);
    let rank = 1;
    for (let i = 0; i < plusResult.length; i++) {
        if (plusResult[i] > wan[0] + wan[1]) {
            rank++;
        } else if (plusResult[i] === wan[0] + wan[1]) {
            return rank;
        }
    }
    return -1
}
