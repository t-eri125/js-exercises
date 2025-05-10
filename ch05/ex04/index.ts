/** 
 * 初項と第 2 項を 1 とするフィボナッチ数列 (1, 1, 2, 3, ...) の最初の 10 個を配列として返す関数を、
 * while 文によるループを使って書きなさい。
 */

export function getFibonacci10While() {
  let a = 1, b = 1;   // 初項と第2項を宣言
  let fibonacci = [a, b];   // 初項と第2項を配列に追加
  let count = 3;  // 現在の項数をカウント

  // 10項目まで、前の2つの項を足して項を計算し、配列に追加
  while (count < 11) {
    const x = a + b;
    fibonacci.push(x);
    [a, b] = [b, x];
    count++;
  }

  return fibonacci;
}

// 同様に、do/while 文を使って書きなさい。
export function getFibonacci10DoWhile() {
  let a = 1, b = 1;   // 初項と第2項を宣言
  let fibonacci = [a, b];   // 初項と第2項を配列に追加
  let count = 3;  // 現在の項数をカウント

  // 10項目まで、前の2つの項を足して項を計算し、配列に追加
  do {
    const x = a + b;
    fibonacci.push(x);
    [a, b] = [b, x];
    count++;
  }
  while (count < 11);

  return fibonacci;
}

// 同様に、for 文を使って書きなさい。
export function getFibonacci10For() {
  let a = 1, b = 1;   // 初項と第2項を宣言
  let fibonacci = [a, b];   // 初項と第2項を配列に追加

  // 10項目まで、前の2つの項を足して項を計算し、配列に追加
  for (let count = 3; count < 11; count++) {
    const x = a + b;
    fibonacci.push(x);
    [a, b] = [b, x];
  }

  return fibonacci;
}

console.log(getFibonacci10While());
console.log(getFibonacci10DoWhile());
console.log(getFibonacci10For());
