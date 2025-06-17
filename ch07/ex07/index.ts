export function sort(
    array: number[],
    compare = (lhs: number, rhs: number): number => (lhs < rhs ? -1 : lhs > rhs ? +1 : 0)
) {
    const arr = [...array]; // 元配列をコピーして不変性を保つ

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (compare(arr[j], arr[j + 1]) > 0) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // 左から順にそれより右の値を比較して必要に応じて入れ替える
            }
        }
    }

    return arr;
}