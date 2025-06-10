function transpose(graph){
    return graph[0].map((_, col) => graph.map((row) => row[col]));
}

function rotate(graph){
    return transpose(graph).map(row => row.reverse());
}

function solution(key, lock) {
    const M = key.length;
    const N = lock.length;
    const size = N * 3;
    const offset = N;

    // 홈(0)의 개수 세기
    let holeCount = 0;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (lock[i][j] === 0) holeCount++;
        }
    }

    // 확장된 lock 배열
    const expanded = Array.from({length: size}, () => Array(size).fill(-1));

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            expanded[offset + i][offset + j] = lock[i][j];
        }
    }

    // 4회 회전하며 완전탐색
    for (let r = 0; r < 4; r++) {
        key = rotate(key);

        for (let x = 0; x <= size - M; x++) {
            for (let y = 0; y <= size - M; y++) {
                let match = true;
                let filled = 0;

                for (let i = 0; i < M; i++) {
                    for (let j = 0; j < M; j++) {
                        const kVal = key[i][j];
                        const lVal = expanded[x + i][y + j];

                        if (lVal === -1) continue;

                        if (kVal === 1 && lVal === 1) {
                            match = false;
                        } else if (kVal === 1 && lVal === 0) {
                            filled++;
                        }
                    }
                }

                if (match && filled === holeCount) return true;
            }
        }
    }

    return false;
}
