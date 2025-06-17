/** 
 * 任意のオブジェクトを受け取り、
 * そのオブジェクトのすべての独自プロパティ（列挙不可、プロパティ名が Symbol のものを含む）
 * および列挙可能な継承プロパティのプロパティ名の配列を返す関数を作成しなさい。
 * 継承プロパティのプロパティ名については Symbol のものは必須とはしない。
 */

// プロパティの列挙可能性と所有権
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Enumerability_and_ownership_of_properties

export function returnPropatyArr(obj: object) {
  // そのオブジェクトのすべての独自プロパティ（列挙不可、プロパティ名が Symbol のものを含む）
  let result = [...Reflect.ownKeys(obj)]; // 一応コピー

  // 列挙可能な継承プロパティのプロパティ名
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) {
      result.push(key);
    }
  }

  // 配列にして返す
  return result;
}