function check(arr, num){
    for(const e of arr){
        if(e[0] > num){
            return false;
        }
    }
    return true;
}

function solution(priorities, location) {
    const answer = [];
    priorities = priorities.map((v, i) => [v, i]);
    while(priorities.length > 0){
        const [value, index] = priorities.shift();
        check(priorities, value) ? answer.push(index) : priorities.push([value, index]);
    }
    
    return answer.indexOf(location) + 1
}