function solution(users, emoticons) {
    const answer = [];
    const n = emoticons.length;
    const temp = [0.1, 0.2, 0.3, 0.4];
    // 플러스 가입자 최대, 판매액 최대 순서 => 다 넣어놓고 정렬 때리면 댐.
    
    const sales = [];
    
    function per(result){
        if(result.length === n){
            sales.push([...result]);
            return;
        }
        for(let i = 0; i < 4; i++){
            result.push(temp[i]);
            per(result);
            result.pop();
        }
    }
    per([]);
    
    // 다해보기
    for(const sale of sales){
        const newEmoticons = [...emoticons].map((v, i) => [sale[i] * 100, v - v * sale[i]]);
        // 이제 사용자 돌면서 가입 얼마하는지, 얼마 나오는지 확인
        let joinCnt = 0;
        let totalAmount = 0;
        
        for(const [rate, limit] of users){
            let amount = 0;
            for(const [saleRate, price] of newEmoticons){
                if(rate <= saleRate){
                    amount += price;
                }
            }
            if(amount >= limit){
                joinCnt += 1
            }
            else{
                totalAmount += amount;
            }
        }
        answer.push([joinCnt, totalAmount]);
    }
    
    
    return answer.sort((a, b) => b[0] - a[0] || b[1] - a[1])[0];
}