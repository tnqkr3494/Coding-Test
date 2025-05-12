function sol(arr) {
  const stack = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "(" || arr[i] === "[" || arr[i] === "{") {
      stack.push(arr[i]);
    } else {
      if (stack.length > 0) {
        const check = stack[stack.length - 1];
        switch (arr[i]) {
          case ")":
            if (check === "(") {
              stack.pop();
            } else {
              return false;
            }
            break;
          case "]":
            if (check === "[") {
              stack.pop();
            } else {
              return false;
            }
            break;

          case "}":
            if (check === "{") {
              stack.pop();
            } else {
              return false;
            }
            break;
        }
      } else {
        return false;
      }
    }
  }
    

  return stack.length === 0;
}

function solution(s) {
    let answer = 0;
    const arr = s.split("");
  for(let i = 0; i < s.length; i++){
      if(sol(arr)){
          answer++;
      }
      arr.push(arr.shift());
  }
    
    return answer;
}
