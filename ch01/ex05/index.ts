// abs：絶対値を計算する関数
export function abs(x: number): number {
  if (x >= 0) {
    // xが正か0の場合
    return x;
  } else {
    // xが負の場合
    return -x;
  }
}

// sum：合計値を計算する関数
export function sum(numbers: number[]): number {
  let sum = 0;
  for (let x of numbers) {
    // numbersの要素の数だけsumに要素の値xを足す
    sum += x;
  }
  return sum;
}

// factorial：階乗を計算する関数
export function factorial(n: number): number {
  let i,
    product = 1;
  for (i = 2; i <= n; i++) product *= i;
  return product;
}
