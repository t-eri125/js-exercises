// 以下のアロー関数を簡潔に記載しなさい。なお、引数や戻り値の括弧の要否などをコードコメントで説明しなさい。
// 
// 1. 自然数`n`と英数文字`c`を引数にとり、文字`c`を`n`回コンソール出力してから文字`c`を`n`個含む配列を返す
// 2. 数値`x`を引数にとり、`x`の二乗の数値を返す
// 3. 引数なしで、現在時刻のプロパティ`now`を含むオブジェクトを返す

// 引数：　2つのため括弧必要
// 戻り値：オブジェクトリテラルではないため、括弧不要
export const returnC = (n: number, c: string): string => {
  for (let i = 0; i < n; i++) {
    console.log(c);
    // console.count() を使うと呼び出された回数が取得できる
  }
  return c.repeat(n);
};

// 引数：　型定義のため必要
// 戻り値：オブジェクトリテラルではないため、括弧不要
export const returnX2 = (x: number): number => x * x;
// 引数で型定義がない場合、戻り値は型チェックのif文を含む必要があるので｛｝が必要になる

// 引数：　ない場合は () が必須
// オブジェクトリテラルを返すときは {} を式として解釈させるために丸括弧が必要
export const returnNowTime = () => ({ now: new Date() });
// export const returnNowTime = () => ({ now: Date.now() });
