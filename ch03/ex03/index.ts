// 与えられた2つの値の差の絶対値が10^(-10)未満であれば、計算精度に影響はない（同値）としてtrueを返す
export function numEqual(a: number, b: number) {
    return Math.abs(a - b) < 1e-10;
}