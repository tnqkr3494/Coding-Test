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
    
    isEmpty(){
        return this.start === this.end;
    }
}

function solution(begin, target, words) {
    const visited = new Set();
    let answer = 0;
    
    function check(a, b){
        let cnt = 0;
        for(let i = 0; i < a.length; i++){
            if(a[i] !== b[i]){
                cnt++;
            }
        }
        return cnt === 1;
    }
    
    function BFS(x){
        const q = new Queue();
        q.push([x, 0]);
        visited.add(x);
        
        while(!q.isEmpty()){
            const [x, time] = q.pop();
            if(x === target){
                return time;
            }
            for(const word of words){
                if(!visited.has(word) && check(x, word)){
                    q.push([word, time + 1]);
                    visited.add(word);
                }
            }
        }    
        return 0;
    }
    
    answer = BFS(begin);
    
    return answer;
}