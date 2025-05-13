/** 
 * try-catch-finally の実行順序が確認できるコードを書きなさい。。
 */
// aとbの値を比較し、一致しなければ例外を投げる
// スローされたエラーの中身をコンソールに表示する
// 値を0に初期化して、完了をコンソールに表示する

// -> try -> catch -> finally

let a: number = 1, b: number = 2;

try {
  if (!(a === b)) throw new Error("aとbは異なる値です");
} catch (e) {
  console.log(e);
} finally {
  console.log(`元の値：a=${a}、b=${b}`);
  a = 0;
  b = 0;
  console.log(`a=${a}、b=${b}に初期化しました`);
}
