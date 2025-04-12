import { error } from "console";

// fib：フィボナッチ数を計算する関数
export function fib(x: number): number {
  let a: number = 0,
    b: number = 1,
    fibNum: number = 1; // a:2つ前の項、b：1つ前の項、fibNum：a+b
  if (x <= 0) throw error; // 0番目以前だったら、エラー
  else if (x === 1) return b; // 1番目の値だったら、1
  else {
    // 2番目以降の値だったら、a,b,fibNumの代入を変えてn番目まで繰りかえす
    for (let i: number = 1; i < x; i++) {
      // numbersの要素の数だけsumに要素の値xを足す
      fibNum = a + b;
      a = b;
      b = fibNum;
    }
    return fibNum;
  }
}
