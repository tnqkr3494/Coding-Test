function solution(enroll, referral, seller, amount) {
    const answer = [];
    
    // 자기가 판 금액의 10%를 추천인에게 주기
    // 추천인은 받은금액의 10%를 또 배분 => 반복 
    
    // 나의 추천인은 누구인지(배분하러 타고 들어가야 하기 때문)
    // 돈을 저장하고 있는 자료구조
    
    const refer = {};
    const money = {};
    for(let i = 0; i < enroll.length; i++){
        refer[enroll[i]] = referral[i];
        money[enroll[i]] = 0;
    }
    
    for(let i = 0; i < seller.length; i++){
        // 이익난 값만큼 반복해서 "-" 나올때까지 타고 들어가기
        let check = seller[i];
        let cash = amount[i] * 100;
        while(check !== "-"){
            let temp = Math.floor(cash * 0.1);
            if(temp < 1){
                money[check] += cash;
                break;
            }
            else{
                money[check] += cash - temp;
                cash = temp;
                check = refer[check];
            }
        }
    }
    
    return Object.values(money);
}