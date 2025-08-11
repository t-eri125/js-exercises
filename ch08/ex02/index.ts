/**
 * 
 * べき乗 (xnx^nxn) を計算する関数を、べき乗演算子 (**) を使わずに
 * 時間計算量 が O(ln⁡n)O(\ln n)O(lnn) となるように再帰およびループでぞれぞれ実装しなさい。
 * nnn は正の整数とする。
 */

// nを半分にしていき、各ステップで1回ずつ計算する
// 計算量はO(ln n)（O(log n)）
export const powerCalculationRecursive = (b: number, n: number): number => {
    // 今回は、指数が負の値の場合、エラーを返す
    if (n < 0) {
        throw new RangeError("負数は計算できません");
    }

    if (n === 0) return 1;       // b^0 = 1
    if (n === 1) return b;       // b^1 = b

    // 再帰呼び出し
    if (n % 2 === 0) {
        // nが偶数の時、b^n = (b^(n/2))^2
        const half = powerCalculationRecursive(b, n / 2);
        return half * half;
        // return powerCalculationRecursive(b * b, n / 2);  // この方が末尾最適化の面で良い
    } else {
        // nが奇数の時、b^n = b * b^(n-1)
        return b * powerCalculationRecursive(b, n - 1);
    }
};

export const powerCalculationLoop = (b: number, n: number): number => {
    // 今回は、指数が負の値の場合、エラーを返す
    if (n < 0) {
        throw new RangeError("負数は計算できません");
    }

    let result = 1;         // 結果（n=0の場合の初期値）
    let newB = b;           // 底を2乗していく
    let newN = n;       // 指数を半分（）にしていく

    // ループ呼び出し
    while (newN > 0) {
        if (newN % 2 === 1) {
            // nが奇数の時とループの最後に、resultにnewBをかける（b^n = b * b^(n-1)のb）
            result *= newB;
        }

        // newB（底）を2乗する（次のループ時に結果にかける）
        newB *= newB;

        // newN（指数）を半分（切り捨て）にする（n/2）
        newN = Math.floor(newN / 2);
    }

    return result;
}
