function filt(arr){
    const result = [];
    
    for(let i = 0; i < arr.length - 1; i++){
        if(arr[i] >= "A" && arr[i] <= "Z" && arr[i + 1] >= "A" && arr[i + 1] <= "Z"){
            const ch = arr[i] + arr[i + 1];
            result.push(ch);    
        }
        
    }
    
    return result
}

function solution(str1, str2) {
    let [union, intersect] = [0, 0];
    // 변환
    const newStr1 = filt(str1.split("").map((e) => e.toUpperCase()))
    const newStr2 = filt(str2.split("").map((e) => e.toUpperCase()))

    // 합집합 / 교집합
    const con1 = {};
    const con2 = {};
    for(const e of newStr1){
     con1[e] ? con1[e]++ : con1[e] = 1;   
    }
    for(const e of newStr2){
        con2[e] ? con2[e]++ : con2[e] = 1;
    }
    
    
    // 합집합 => MAX, 교집합 => MIN
    const check = new Set([...Object.keys(con1), ...Object.keys(con2)]);
    
    for(const e of check){
        const x = con1[e] || 0;
        const y = con2[e] || 0;
        union += Math.max(x, y)
        intersect += Math.min(x, y);
    }
    
    if(intersect === 0 && union === 0){
        return 65536;
    }
    
    return Math.floor((intersect / union) * 65536)
    
    
}