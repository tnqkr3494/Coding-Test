function calc(start, end){
    const [startHour, startMin] = [Number(start.slice(0, 2)), Number(start.slice(3))];
    const [endHour, endMin] = [Number(end.slice(0, 2)), Number(end.slice(3))];
    
    return (endHour * 60 + endMin) - (startHour * 60 + startMin);
}

// 기본 시간, 기본 요금, 단위 시간, 단위 요금
// 기본 시간 초과하면 ((총 시간 - 기본 시간) / 단위시간) * 단위 요금
function payment(fees, time){
    const [basicTime, basicPay, min, pay] = fees;
    
    if(time <= basicTime){
        return basicPay;
    }
    
    else{
        return basicPay + Math.ceil((time - basicTime) / min) * pay;

    }
}

function solution(fees, records) {
    let answer = [];    
    const park = {};
    
    for(const record of records){
        const [time, num, order] = record.split(" ");
        park[num] ? park[num].push(time) : park[num] = [time];
    }
    
    for(const num of Object.keys(park).sort()){
        if(park[num].length % 2 !== 0){
            park[num].push("23:59");
        }
        let totalTime = 0;
        for(let i = 0; i < park[num].length - 1; i += 2){
            totalTime += calc(park[num][i], park[num][i + 1]);
        }
        answer.push(payment(fees, totalTime));
    }
    
    return answer;
}