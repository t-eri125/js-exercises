/** 
 * 任意の文字列を引数にとり、その文字列が JSON としてパース出来る場合
 *  {success: true, data: <パースしたデータ>}を返し、
 * できない場合 {success: false, error: <エラー内容>} を返す関数を書きなさい
 */

// JSONとしてパースしてJSON文字列にした結果を返す
// ここでエラーをキャッチしたら、エラーの内容を返す

export function f(str: string) {
  try {
    return `{success: true, data: ${JSON.stringify(JSON.parse(str))}}`;
  } catch (e) {
    return `{success: false, error: ${e}}`;
  }
}

console.log(f("{\"a\": 1, \"B\": \"文字\"}"));
