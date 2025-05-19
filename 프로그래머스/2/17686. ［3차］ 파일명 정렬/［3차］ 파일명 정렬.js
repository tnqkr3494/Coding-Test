function solution(files) {
    const newFiles = files.map((e) => e.toLowerCase());
    
    const check = [];
    
    for(let i = 0; i < newFiles.length; i++){
        const file = newFiles[i];
        let head = "";
        let num = "";
        let flag = false;
        for(let j = 0; j < file.length; j++){
            if((file[j] >= "0" && file[j] <= "9")){
                num += file[j];
                flag = true;
            }
            else{
                if(flag){
                    break;
                }
                head += file[j];
            }
        }
        check.push([head, Number(num), i]);
    }   
    
    check.sort((a, b) => 
    a[0].localeCompare(b[0]) ||
    a[1] - b[1] ||
    a[2] - b[2]
);
    
    
    const answer = [];
    
    for(const e of check){
        const idx = e[2];
        answer.push(files[idx]);
    }
    
    return answer;
    
}