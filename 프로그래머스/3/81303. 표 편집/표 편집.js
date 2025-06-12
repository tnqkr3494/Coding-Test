class Node{
    constructor(index){
        this.index = index;
        this.prev = null;
        this.next = null;
    }
}

function solution(n, k, cmd) {
    const answer = Array.from({length:n}, () => "O");
    let curNode = new Node(0);
    let prevNode = new Node(0);
    
    for(let i = 1; i < n; i++){
        const newNode = new Node(i);
        newNode.prev = prevNode;
        prevNode.next = newNode;
        prevNode = newNode;
        
        if(i === k){
            curNode = newNode;
        }
    }
    
    const stack = [];
    let prev = new Node(0);
    let next = new Node(0);
    for(let i = 0; i < cmd.length; i++){
        const [order, num] = cmd[i].split(" ");
        let cnt = 0;
        switch(order){
            case "U":
                while(cnt < num){
                    cnt++;
                    curNode = curNode.prev;
                }
            break;
                
            case "D":
                while(cnt < num){
                    cnt++;
                    curNode = curNode.next;
                }
            break;
                
            case "C":
                stack.push(curNode);
                prev = curNode.prev;
                next = curNode.next;
                
                if(prev && next){
                    prev.next = next;
                    next.prev = prev;
                    curNode = next;
                }
                // 오른쪽 끝
                else if(prev){
                    prev.next = null;
                    curNode = prev;
                }
                // 시작지점
                else if(next){
                    next.prev = null;
                    curNode = next;
                }
            break;
                
            case "Z":
                const recoverNode = stack.pop();
                prev = recoverNode.prev;
                next = recoverNode.next;
                if(prev){
                    prev.next = recoverNode;
                }
                if(next){
                    next.prev = recoverNode;  
                }
                
                
            break;
        }
    }
    
    for(let i = 0; i < stack.length; i++){
        answer[stack[i].index] = "X"
    }
    

    return answer.join("");
}