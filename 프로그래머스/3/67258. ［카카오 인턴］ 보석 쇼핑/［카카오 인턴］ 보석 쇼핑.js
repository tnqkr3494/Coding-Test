function solution(gems) {
    const totalKinds = new Set(gems).size;
    const gemCounts = {};
    let [start, end] = [0, 0];
    let minLen = Infinity;
    let answer = [0, 0];
    let cnt = 0;

    gemCounts[gems[0]] = 1;
    cnt = 1;

    while (start <= end && end < gems.length) {
        if (cnt === totalKinds) {
            if (end - start < minLen) {
                minLen = end - start;
                answer = [start + 1, end + 1];
            }
            gemCounts[gems[start]] -= 1;
            if (gemCounts[gems[start]] === 0) {
                delete gemCounts[gems[start]];
                cnt -= 1
            }
            start += 1;
        } else {
            end += 1;
            if (end === gems.length) break;
            
            if(gemCounts[gems[end]]){
                gemCounts[gems[end]] += 1;
            }
            else{
                cnt += 1;
                gemCounts[gems[end]] = 1;
            }
        }
    }

    return answer;
}
