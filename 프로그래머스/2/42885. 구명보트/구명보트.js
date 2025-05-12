function solution(people, limit) {
    let answer = 0;
    
    people.sort((a, b) => a - b);
    
    // 큰 사람 작은사람 투포인터로 살펴보기
    let [start, end] = [0, people.length - 1];
    
    while(start <= end){
        if(people[start] + people[end] <= limit){
            start++;
            end--;
        }
        else{
            end--;
        }
        answer++;
    }
    
    return answer
    
    
}