function solution(s) {
    const arr = s.split(" ").map(Number)
    return `${Math.min(...arr)} ${Math.max(...arr)}`
}