function solution(n, costs) {
    let answer = 0;
    
    function findParent(parent, x){
        if(parent[x] !== x){
            parent[x] = findParent(parent, parent[x]);
        }
        return parent[x];
    }
    
    function union(a, b, parent){
        a = findParent(parent, a)
        b = findParent(parent, b)
        
        if(a < b){
            parent[b] = a;
        }
        else{
            parent[a] = b;
        }
    }
    
    costs.sort((a, b) => a[2] - b[2]);
    const parent = Array.from({length:n}, (v, i) => i);
    
    for(const [a, b, cost] of costs){
        if(findParent(parent, a) !== findParent(parent, b)){
            answer += cost;
            union(a, b, parent);
        }
    }
    
    
    return answer;
}