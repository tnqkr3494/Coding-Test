function refine(str) {
    const result = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i + 1] === "#") {
            result.push(str[i] + "#");
            i++;
        } else {
            result.push(str[i]);
        }
    }
    return result;
}

    
function calc(start, end){
    const startArr = start.split(":").map(Number);
    const endArr = end.split(":").map(Number);
    
    return (endArr[0] * 60 + endArr[1]) - (startArr[0] * 60 + startArr[1]);
    
}

function solution(m, musicinfos) {
    let answer = '';
    // m과 재생시간사이의 관계, #주의, 악보는 반복
    const arr = [];
    const neo = refine(m);
    
    for(const musicinfo of musicinfos){
        const [start, end, name, music] = musicinfo.split(",");
        arr.push([calc(start, end), name, refine(music)]);
    }
    arr.sort((a, b) => b[0] - a[0]);
    for(let i = 0; i < arr.length; i++){
        const [time, name, music] = arr[i];
        if(neo.length > time){
            break;
        }
        
        const full = [];
        
        for(let j = 0; j < time; j++){
            full.push(music[j % music.length]);
        }
        
        for(let j = 0; j <= time - neo.length; j++){
            let flag = true;
            for(let k = 0; k < neo.length; k++){
                if(neo[k] !== full[j + k]){
                    flag = false;
                    break;
                }
            }
            if(flag){
                answer = name;
                break;
            }
        }
        if(answer.length > 0){
            break;
        }
    }
    
    return answer || "(None)";
}