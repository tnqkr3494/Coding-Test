function solution(m, n, puddles) {
    const MOD = 1e9 + 7;
    const not = Array.from({length: n}, () => Array(m).fill(false));
    const dp = Array.from({length: n}, () => Array(m).fill(0));

    for (const [x, y] of puddles) {
        not[y - 1][x - 1] = true;
    }

    // 첫 행 초기화
    for (let j = 0; j < m; j++) {
        if (not[0][j]) break;
        dp[0][j] = 1;
    }

    // 첫 열 초기화
    for (let i = 0; i < n; i++) {
        if (not[i][0]) break;
        dp[i][0] = 1;
    }

    // 나머지 DP 계산
    for (let i = 1; i < n; i++) {
        for (let j = 1; j < m; j++) {
            if (not[i][j]) continue;
            dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % MOD;
        }
    }

    return dp[n - 1][m - 1];
}
