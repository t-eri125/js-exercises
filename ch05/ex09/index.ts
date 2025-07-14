/** 
 * 任意の文字列を引数にとり、その文字列が JSON としてパース出来る場合
 *  {success: true, data: <パースしたデータ>}を返し、
 * できない場合 {success: false, error: <エラー内容>} を返す関数を書きなさい
 */

// JSONとしてパースしてJSON文字列にした結果を返す
// ここでエラーをキャッチしたら、エラーの内容を返す

export function f(str: string) {
  let obj: { success: true, data: any } | { success: false, data: string };

  try {
    const parsed: object = JSON.parse(str);
    // 明示的に条件を追加して throw も可能
    if (typeof parsed !== 'object' && parsed === null) {
      throw new Error();
    }

    obj = { success: true, data: JSON.stringify(parsed) };
  } catch (e) {
    obj = { success: false, data: String(e) };
  } finally {
    console.log(obj);
    // return obj;
  }
}

// 間違えていたので修正
// export function f(str: string) {
//   try {
//     return `{success: true, data: ${JSON.stringify(JSON.parse(str))}}`;
//   } catch (e) {
//     return `{success: false, error: ${e}}`;
//   }
// }

f("{\"a\": 1, \"B\": \"文字\"}");
