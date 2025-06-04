function calc(arr, pick){
    let result = 0;
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === "diamond"){
            if(pick === 1) result += 5;
            else if(pick === 2) result += 25;
            else result += 1
        }
        else if(arr[i] === "iron"){
            if(pick === 1) result += 1;
            else if(pick === 2) result += 5;
            else result += 1
        }
        else{
            result += 1;
        }
    }
    return result;
}

function solution(picks, minerals) {
    let answer = 0;
    // picks: 다이아, 철, 돌
    let temp = [];
    
    for(let i = 0; i < minerals.length; i += 5){
        let cnt = 0;
        const mineral = [];
        for(let j = i; j < Math.min(i + 5, minerals.length); j++){
            mineral.push(minerals[j]);
            switch(minerals[j]){
                case "diamond":
                    cnt += 25
                break;
                case "iron":
                    cnt += 5
                break;
                case "stone":
                    cnt += 1
                break;
            }
        }
        temp.push([cnt, ...mineral]);
    }
    
    // 자르고 정렬
    const cut = Math.min(temp.length, picks.reduce((acc, cur) => acc + cur));
    temp = temp.slice(0, cut).sort((a, b) => b[0] - a[0]);
    
    for(let i = 0; i < 3; i++){
        if(!temp[0]) break;
        while(picks[i] > 0 && temp[0]){
            picks[i] -= 1;
            answer += calc(temp[0].slice(1), i);
            temp.shift();
        }
    }

    
    return answer;
}