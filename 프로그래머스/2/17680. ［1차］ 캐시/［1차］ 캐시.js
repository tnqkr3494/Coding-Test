let answer = 0;

function check(arr, name){
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === name){
            arr.splice(i, 1);
            answer++;
            return;
        }
    }
    answer += 5
    return;
}


function solution(cacheSize, cities) {
    const cache = [];
    
    for(let city of cities){
        city = city.toLowerCase();
        check(cache, city);
        if(cache.length >= cacheSize){
            cache.shift();
        }
        
        if(cache.length < cacheSize){
           cache.push(city);    
        }
        
    }
    
    return answer
}