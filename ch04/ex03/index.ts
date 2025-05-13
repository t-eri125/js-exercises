/**
 * ビット演算のみを用いて減算を行う関数 sub を実装しなさい (例: sub(8, 3) は 5 を返すものとする)。
 * 演算子として用いて良いのは &, |, ^, ~, <<, >>, >>> だけとする (+ や === 等は禁止)。
 * ヒント: 与えられた数の 2 の補数はビットの 0, 1 を反転し、1 を加えることで求められる。
 */

export function sub(a: number, b: number) {

  /**
   * 足し算するメソッド　　x: 元の数、y: 足す数
   * 
   * 足す数が0になるまで繰り返す
   * 桁上がり発生個所（1同士のところ）を抽出（ex. 01 & 01-> 01）
   * 桁上がりは無視して加算（01 + 01 で 10 になるべきところは 00）
   * 桁上がりすべき数（無視された分）を次に足す数に設定する（ex. 01 -> 10）
   */
  const add = (x: number, y: number) => {
    while (y) {
      const tmp = x & y;
      x = x ^ y;
      y = tmp << 1;
    }
    return x;
  }

  const inversionB: number = ~b;  // bを反転した数
  const addB: number = 1;         // bの2の補数表現のために足す数

  const carryUpNum: number = add(inversionB, addB);   // bの2の補数表現
  const subNum: number = add(a, carryUpNum);          // a + bの2の補数表現

  return subNum;
}

console.log(sub(-15, 20));
