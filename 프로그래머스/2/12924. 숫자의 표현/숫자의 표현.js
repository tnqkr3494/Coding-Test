function solution(n) {
    let answer = 0;
    let start = 1, end = 1, sum = 1;

    while (start <= n / 2) {
        if (sum < n) {
            end++;
            sum += end;
        } else if (sum > n) {
            sum -= start;
            start++;
        } else {
            answer++;
            sum -= start;
            start++;
        }
    }

    return answer + 1;
}
