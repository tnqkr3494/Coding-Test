function solution(word) {
 const vowel = ["A", "E", "I", "O", "U"]
 const result = []
 
 function sol(depth, ch){
     let flag = false;
     
     if(depth > 5){
         return;
     }
     else{
         // 여기서 몇번째인지 return
         const temp = ch.join("");
         if(temp === word){
             result.push(temp);
             flag = true;
             return;
         }
         result.push(temp);

     }
     
     for(let i = 0; i < 5; i++){
         ch.push(vowel[i]);
         sol(depth + 1, ch)
         ch.pop();
         if(flag){
             return
         }
     }
 }
     sol(0, []);
     
     return result.indexOf(word)
 
}