function solution(clothes) {
    const style = {};
    
    for(const cloth of clothes){
        const [name, kind] = cloth;
        
        style[kind] ? style[kind]++ : style[kind] = 1;
    }
    const result = Object.values(style);
    
    let answer = result.reduce((acc, cur) => acc * (cur + 1), 1);
    
    return answer - 1
}