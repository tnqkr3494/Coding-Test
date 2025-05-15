function solution(dirs) {
    let answer = 0;
    const check = {"U" : [-1, 0], "D" : [1, 0], "L" : [0, -1], "R" : [0, 1]};
    
    const graph = Array.from({length: 11}, () => Array.from({length:11}, () => Array(4).fill(false)));
    
    let [startX, startY] = [5, 5];
    
    for(let i = 0; i < dirs.length; i++){
        const path = check[dirs[i]];
        const nx = startX + path[0];
        const ny = startY + path[1];
        let flag = 0;
        switch(dirs[i]){
                case("U"):
                    flag = 0;
                break;
                
                case("L"):
                    flag = 1;
                break;
                    
                case("D"):
                    flag = 2;
                break;
                
                case("R"):
                    flag = 3;
                break;
                
        }
        
        if(0 <= nx && nx < 11 && 0 <= ny && ny < 11){
            // 처음 가보는 길이면
             if(!graph[nx][ny][flag] && !graph[startX][startY][(flag + 2) % 4]){
                graph[nx][ny][flag] = true;
                graph[startX][startY][(flag + 2) % 4] = true;
                answer++;
             }
            [startX, startY] = [nx ,ny];
        }
        
    }
    return answer;
}