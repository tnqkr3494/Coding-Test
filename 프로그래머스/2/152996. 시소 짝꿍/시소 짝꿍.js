function solution(weights) {
    let answer = 0;
    const check = Array(1001).fill(0);

    for (const weight of weights) {
        check[weight]++;
    }

    const ratios = [
        [1, 1],
        [2, 1],
        [3, 2],
        [4, 3],
    ];

    for (let i = 100; i <= 1000; i++) {
        if (!check[i]) continue;

        for (const [a, b] of ratios) {
            const j = (i * a) / b;

            if (j > 1000 || j < 100 || j !== Math.floor(j)) continue;

            if (i === j) {
                answer += (check[i] * (check[i] - 1)) / 2;
            } else if (i < j) {
                answer += check[i] * check[j];
            }
        }
    }

    return answer;
}
