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

function calc(ch){
    const arr = ch.split(":").map(Number);
    return arr[0] * 60 + arr[1];
}

function trans(num){
    const result = ["", ":", ""];
    let hour = String(Math.floor(num / 60));
    let min = String(num % 60);
    if(hour.length < 2){
        hour = "0" + hour;
    }
    if(min.length < 2){
        min = "0" + min;
    }
    result[0] = hour;
    result[2] = min;
    return result;
}

function solution(n, t, m, timetable) {
    let answer = '';
    timetable.sort();
    const q = new Queue();
    for(const time of timetable){
        q.push(calc(time));
    }
    const bus = new Queue();
    bus.push(540);
    let busTime = 540;
    const lastBus = busTime + t * (n - 1);
    for(let i = 1; i < n; i++){
        busTime += t
        bus.push(busTime);
    }
    
    // m만큼 쭉쭉 꺼내는데 => 마지막 상황만 살피면 됨.
    // 만약 꽉차게 대리고 가면 => 가장 늦은 사람보다 1분 앞서서
    // 꽉차지 않게 대리고 가면 or 비어있으면 => 마지막 버스 도착시간과 동일하게
    let lastTiming = [];
    while(!bus.isEmpty()){
        lastTiming = [];
        const check = bus.pop();
        let cnt = 0;
        while(!q.isEmpty() && q.items[q.start] <= check && cnt < m){
            cnt++;
            lastTiming.push(q.pop());
        }
    }
    
    
    
    if(lastTiming.length < m){
        // 꽉차지 않게 혹은 비어있으면
        answer = trans(lastBus)
    }
    else{
        // 꽉차게 데리고 갔으면
        answer = trans(lastTiming.at(-1) - 1);
    }

    return answer.join("");
}