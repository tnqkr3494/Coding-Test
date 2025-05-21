class Queue {
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
    size(){
        return this.end - this.start;
    }
}

function solution(bridge_length, weight, truck_weights) {
    let time = 0;
    const bridge = new Queue();
    let bridgeWeight = 0;
    let idx = 0;
    
    for(let i = 0; i < bridge_length; i++){
        bridge.push(0);
    }

    while (idx < truck_weights.length || bridgeWeight > 0) {
        time++;
        
        const left = bridge.pop();
        bridgeWeight -= left;
        
        // 트럭 다 빼올 때 까지
        if (idx < truck_weights.length) {
            const nextTruck = truck_weights[idx];
            // 하중 감당 가능하면
            if (bridgeWeight + nextTruck <= weight) {
                bridge.push(nextTruck);
                bridgeWeight += nextTruck;
                idx++;
            } else {
                bridge.push(0);
            }
        } else {
            bridge.push(0);
        }
    }

    return time;
}
