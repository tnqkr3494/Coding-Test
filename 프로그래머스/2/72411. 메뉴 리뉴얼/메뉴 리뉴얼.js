function solution(orders, course) {
    const answer = [];
    
    function combinations(n, result, start, arr, dic){
        if(result.length === n){
            //후처리
            const key = [...result].join("");
            dic[key] ? dic[key] += 1 : dic[key] = 1;
            return;
        }
        for(let i = start; i < arr.length; i++){
            result.push(arr[i]);
            combinations(n, result, i + 1, arr, dic);
            result.pop();
        }
    }
    
    for(const num of course){
        const temp = {};
        for(const order of orders){
            const sortedOrder = order.split("").sort();
            combinations(num, [], 0, sortedOrder, temp);
        }
        const arr = Object.entries(temp).sort((a, b) => b[1] - a[1]);
        
        for(let i = 0; i < arr.length; i++){
            if(arr[i][1] >= 2 && arr[0][1] === arr[i][1]){
                answer.push(arr[i][0]);
            }
        }
    }
    
    return answer.sort();
}