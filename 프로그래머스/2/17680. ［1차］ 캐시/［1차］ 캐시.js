function solution(cacheSize, cities) {
    let answer = 0;
    const cache = [];
    
    if (cacheSize === 0) {
        return cities.length * 5;
    }
    
    for (let city of cities) {
        city = city.toLowerCase();
        const index = cache.indexOf(city);
        
        if (index !== -1) { // 캐시 히트
            cache.splice(index, 1); // 기존 위치에서 제거
            answer += 1;
        } else { // 캐시 미스
            answer += 5;
            if (cache.length >= cacheSize) {
                cache.shift(); // 가장 오래된 항목 제거
            }
        }
        cache.push(city); // 최신 항목으로 추가
    }
    
    return answer;
}