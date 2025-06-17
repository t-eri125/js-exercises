/** 
 * Object.assign()と等価な関数 assign() を作成しなさい。 与えられたテストを全てパスすること。
 */

/**
 * 
 * It performs the following steps when called:
 * 1. Let to be ? ToObject(target).
 * 2. If only one argument was passed, return to.
 * 3. For each element nextSource of sources, do
    a. If nextSource is neither undefined nor null, then
    i. Let from be ! ToObject(nextSource).
      ii. Let keys be ? from.[[OwnPropertyKeys]]().
      iii. For each element nextKey of keys, do
        1. Let desc be ? from.[[GetOwnProperty]](nextKey).
        2. If desc is not undefined and desc.[[Enumerable]] is true, then
          a. Let propValue be ? Get(from, nextKey).
          b. Perform ? Set(to, nextKey, propValue, true).
  * 4. Return to.
The "length" property of this function is 2𝔽.

 */

export function assign(target: any, ...sources: any[]) {
  // 1. toを? ToObject(target)とする。
  // ToObjectはnull または undefined を渡すと TypeError を投げる。
  // それ以外のプリミティブ値（数値、文字列、真偽値など）なら対応するラップオブジェクトを返す。
  if (target == null) {
    throw new TypeError();
  }
  const to = Object(target);

  // 2. 引数が1つしか渡されなかった場合（コピー元fromがない場合）は、toを返す。
  if (sources.length === 0) {
    return to;
  }

  // 3. sourcesの各要素nextSourceに対して、以下を実行する。
  for (let nextSource of sources) {
    if (nextSource != null) {
      // a. nextSource が未定義でも NULL でもない場合
      // i. from を ！ToObject(nextSource)とします。
      const from = Object(nextSource);  // 失敗しない前提

      // ii. keysを? from.[[OwnPropertyKeys]]()とする。（＝「オブジェクト自身（＝継承を除く）の全プロパティキー」を列挙）
      const keys = Reflect.ownKeys(from);

      // iii. keysの各要素nextKeyに対して、以下を実行する。
      for (let nextKey of keys) {
        // 1. descを? from.[[GetOwnProperty]](nextKey)とする。
        const desc = Object.getOwnPropertyDescriptor(from, nextKey);
        // 2. descが未定義でなく、desc.[[Enumerable]]が真である場合、次のようにする。
        if (desc && desc.enumerable) {
          // a. propValueを? Get(from, nextKey)とします。
          const propValue = from[nextKey];
          // b. 実行する ? Set(to, nextKey, propValue, true)を実行する。
          to[nextKey] = propValue;
        }
      }
    };
  }

  // 4. to を返す
  return to;
}
