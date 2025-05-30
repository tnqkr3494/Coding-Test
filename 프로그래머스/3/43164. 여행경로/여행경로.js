function solution(tickets) {
    const answer = ["ICN"];
    const path = {};

    for (const [start, end] of tickets) {
        path[start] ? path[start].push(end) : path[start] = [end];
    }

    for (const key in path) {
        path[key].sort();
    }

    const temp = [];

    function DFS(depth, visited, next, result) {
        if (depth === tickets.length) {
            temp.push(result.join(","));
            return;
        }

        if (!path[next]) return;

        for (let i = 0; i < path[next].length; i++) {
            const key = `${next}${i}`;
            if (!visited.has(key)) {
                visited.add(key);
                result.push(path[next][i]);
                DFS(depth + 1, visited, path[next][i], result);
                result.pop();
                visited.delete(key);
            }
        }
    }

    DFS(0, new Set(), "ICN", []);
    temp.sort();
    answer.push(...temp[0].split(","));

    return answer;
}
