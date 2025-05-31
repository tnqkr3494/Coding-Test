function solution(data, col, row_begin, row_end) {
    let answer = 0;
    
    data.sort((a, b) => a[col - 1] - b[col - 1] || b[0] - a[0]);
    
    const temp = [];
    for(let i = row_begin - 1; i <= row_end - 1; i++){
        const sum = data[i].map((e) => e % (i + 1)).reduce((acc, cur) => acc + cur);
        temp.push(sum);
    }
    answer = temp.reduce((acc, cur) => acc ^ cur);

    return answer;
}