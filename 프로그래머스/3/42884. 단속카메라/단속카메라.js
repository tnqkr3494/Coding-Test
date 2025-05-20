function solution(routes) {
    let answer = 1;
    routes.sort((a, b) => a[0] - b[0] || a[1] - b[0]);
    let [start, end] = routes[0];
    
    for(let i = 1; i < routes.length; i++){
        const [nextStart, nextEnd] = routes[i];
        
        if(end < nextStart){
            answer++;
            [start, end] = [nextStart, nextEnd];
            continue;
        }
                
        if(end >= nextStart){
         start = nextStart;   
        }
        
        if(end >= nextEnd){
            end = nextEnd;
        }
    }
    
    return answer;
}


// 20 19 18 17 16 15 14 13
// a  a  a  a  a  a  a
//             b  b 