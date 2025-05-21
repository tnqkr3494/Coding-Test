class Queue{
    items = [];
    start = 0;
    end = 0;
    
    push(value){
        this.items.push(value);
        this.end++;
    }
    pop(){
        return this.items[this.start++];
    }
}

function solution(queue1, queue2) {
    let answer = 0;
    const q1 = new Queue();
    const q2 = new Queue();
    let [sumQ1, sumQ2] = [queue1.reduce((acc, cur) => acc + cur), queue2.reduce((acc, cur) => acc + cur)];
    
    for(let i = 0; i < queue1.length; i++){
        q1.push(queue1[i])
        q2.push(queue2[i])
    }
    
    for(let i = 0; i <= queue1.length * 2 + 1; i++){
        if(sumQ1 === sumQ2){
            break;
        }
        else if(sumQ1 < sumQ2){
            const num = q2.pop();
            sumQ2 -= num;
            sumQ1 += num;
            q1.push(num);
        }
        else{
            const num = q1.pop();
            sumQ1 -= num;
            sumQ2 += num;
            q2.push(num);
        }
        answer++;
    }
    
    return sumQ1 === sumQ2 ? answer : -1;
}