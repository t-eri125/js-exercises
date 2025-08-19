// f はオブジェクトを1つ引数に取る関数
function cache(f: Function) {
  // slowFnの引数のオブジェクトが到達不能になった場合には、キャッシュがガベージコレクションの対象になる
  const weakCache = new WeakMap();

  return function (obj: object) {
    if (weakCache.has(obj)) {
      // 同じ引数のキャッシュが存在したら、キャッシュ済みの値を返す
      return weakCache.get(obj);
    }
    // キャッシュが存在しない場合、処理をキャッシュに保存
    const result = f(obj);
    weakCache.set(obj, result);
    return result;
  };
}

function slowFn(obj: object): object {
  // 時間のかかる処理
  // 値を足していきobjの値を置き換える
  let newObj = { ...obj, value: 0 };

  let sum = 0;
  for (let i = 0; i < 1000000000; i++) {
    sum += i
  };

  newObj.value = sum;
  return newObj;
}

// cachedSlowFnを同じ引数で複数回呼び出すと、2回目以降はキャッシュが返る
export const cachedSlowFn = cache(slowFn);
