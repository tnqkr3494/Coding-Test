function solution(storey) {
    let answer = 0;

    while (storey > 0) {
        let check = storey % 10;
        let next = Math.floor(storey / 10) % 10;

        if (check > 5 || (check === 5 && next >= 5)) {
            answer += 10 - check;
            storey += 10 - check;
        } else {
            answer += check;
        }

        storey = Math.floor(storey / 10);
    }

    return answer;
}
