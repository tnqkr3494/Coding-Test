function solution(n, stations, w) {
    let start = 1;
    let answer = 0;
    
    for (const station of stations) {
        if (start < station - w) {
            const coverage = (station - w) - start;
            answer += Math.ceil(coverage / (2 * w + 1));
        }
        start = station + w + 1;
    }
    
    if (start <= n) {
        answer += Math.ceil((n - start + 1) / (2 * w + 1));
    }
    
    return answer;
}