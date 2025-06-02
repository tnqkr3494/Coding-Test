class Queue{
    items = [];
    start = 0;
    end = 0;
    
    push(value){
        this.items.push(value);
        this.end++;
    }
    pop(){
        return this.items[this.start++];
    }
    isEmpty(){
        return this.start === this.end;
    }
}

const path = [[1, 0], [-1, 0], [0, 1], [0, -1]];
function BFS(graph, x, y){
    const q = new Queue();
    const visited = Array.from({length:5}, () => Array(5).fill(-1));
    visited[x][y] = 0;
    q.push([x, y]);
    
    while(!q.isEmpty()){
        const [x, y] = q.pop();
        if(graph[x][y] === "P" && visited[x][y] <= 2 && visited[x][y] > 0){
            return false;
        }
        for(let i = 0; i < 4; i++){
            const [nx, ny] = [x + path[i][0], y + path[i][1]];
            if(0 <= nx && nx < 5 && 0 <= ny && ny < 5 && graph[nx][ny] !== "X" && visited[nx][ny] === -1){
                q.push([nx, ny]);
                visited[nx][ny] = visited[x][y] + 1;
            }
        }
    }
    
    return true;
}

function solution(places) {
    const answer = [];
    
    for(let place of places){
        // 장소마다 확인하기
        place = place.map((e) => e.split(""));
        const person = [];
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                if(place[i][j] === "P"){
                    person.push([i, j]);
                }
            }
        }
        let flag = true;
        for(const [x, y] of person){
            if(!BFS(place, x, y)){
                answer.push(0);
                flag = false;
                break;
            }
        }
        if(flag){
            answer.push(1);
        }
    }
    
    
    
    return answer;
}