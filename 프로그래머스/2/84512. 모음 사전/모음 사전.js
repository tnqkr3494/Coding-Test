function solution(word) {
 const vowel = ["A", "E", "I", "O", "U"]
 const result = []
 
 function sol(depth, ch){
     if(depth > 5){
         return;
     }
     else{
         // 여기서 몇번째인지 return
         const temp = ch.join("");
         result.push(temp);
     }
     
     for(let i = 0; i < 5; i++){
         ch.push(vowel[i]);
         sol(depth + 1, ch)
         ch.pop();
     }
 }
     sol(0, []);
     
     return result.indexOf(word)
 
}