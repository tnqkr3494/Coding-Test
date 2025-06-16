function solution(money) {
    const n = money.length;

    const dp1 = Array(n).fill(0); // 첫 번째 집 털고 마지막 집 안 털기
    const dp2 = Array(n).fill(0); // 첫 번째 집 안 털고 마지막 집 털기

    dp1[0] = money[0];
    dp1[1] = Math.max(money[0], money[1]);
    for (let i = 2; i < n - 1; i++) {
        dp1[i] = Math.max(dp1[i - 1], money[i] + dp1[i - 2]);
    }

    dp2[1] = money[1];
    for (let i = 2; i < n; i++) {
        dp2[i] = Math.max(dp2[i - 1], money[i] + dp2[i - 2]);
    }

    return Math.max(dp1[n - 2], dp2[n - 1]);
}
