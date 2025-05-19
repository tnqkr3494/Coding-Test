function solution(record) {
    // uid값이 unique key
    const db = {};
    const answer = [];
    
    for(const e of record){
        const [order, id, name] = e.split(" ");
        if(order === "Enter" || order === "Change"){
            db[id] = name;
        }
    }
    
    for(const e of record){
        const [order, id, name] = e.split(" ");
        switch(order){
            case "Enter":
                answer.push(`${db[id]}님이 들어왔습니다.`)
            break;
            case "Leave":
                answer.push(`${db[id]}님이 나갔습니다.`)
            break;
            case "Change":
            break;
        }
    }
    
    return answer;
}