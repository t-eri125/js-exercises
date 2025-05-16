/**
 * 与えられた数値を 32 ビット整数表現形式で表現した場合に 1 であるビットの数を返す
 * 関数 bitCount を書きなさい。
 * 例として bitCount(0b111) は 3 を返し、
 * bitCount(0b1111111111111111111111111111111) は 31 を返しなさい。
 */

export function bitCount(n: number): number {
  let count = 0;
  let num = 1;

  for (let i = 0; i < 32; i++) {
    if (n & num) {
      count++;
    }
    num = num << 1;
  }
  return count;
}

// 文字列比較してしまったため、修正
// 考え方
// 32ビット整数表現に変換する
// 32ビット整数表現形式の文字数を数える
// 一文字ずつ確認し、1の場合にカウントをインクリメント

// export function bitCount(n: number): number {
//   // >> 符号付き右シフト演算子を使って、符号付32ビット整数表現として扱う
//   const binaryString = (n >> 0).toString(2); // 2進数文字列に変換
//   let count = 0;
//   for (let i = 0; i < binaryString.length; i++) {
//     if (binaryString[i] === '1') {
//       count++;
//     }
//   }
//   return count;
// }
