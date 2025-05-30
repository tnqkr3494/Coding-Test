function solution(rows, columns, queries) {
    const answer = [];
    const graph = Array.from({length:rows}, () => Array(columns).fill(0));
    let num = 1;
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
           graph[i][j] = num++; 
        }
    }
    for(let [x1, y1, x2, y2] of queries){
        [x1, y1, x2, y2] = [x1 - 1, y1 - 1, x2 - 1, y2 - 1];
        const check = [];
        const temp = graph[x1][y1];
        check.push(temp);
        // 위
        for(let i = x1; i < x2; i++){
            graph[i][y1] = graph[i + 1][y1];
            check.push(graph[i][y1]);
        }
        // 왼
        for(let i = y1; i < y2; i++){
            graph[x2][i] = graph[x2][i + 1];
            check.push(graph[x2][i]);
        }
         // 아
        for(let i = x2; i > x1; i--){
            graph[i][y2] = graph[i - 1][y2];
            check.push(graph[i][y2]);
        }
        // 오
        for(let i = y2; i > y1; i--){
            graph[x1][i] = graph[x1][i - 1];
            check.push(graph[x1][i]);
        }
        graph[x1][y1 + 1] = temp;
        check.sort((a, b) => a - b);
        answer.push(check[0]);
    }
    
    return answer;
}