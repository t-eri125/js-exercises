export const nestedUnwritableObj = (): object => {
    const obj = {
        c: {
            d: {
                e: 3
            }
        }
    };

    const stack: any[] = [obj];
    while (stack.length) {
        const current = stack.pop();    // ネスト構造なので最も深いところから処理していく

        // 既存プロパティを Unwritable かつ新規追加不可にする
        for (const key of Object.keys(current)) {
            if (typeof current[key] === "object" && current[key] !== null) {
                stack.push(current[key]);
            }
            // writable： false に設定
            Object.defineProperty(current, key, {
                value: current[key],
                writable: false,
                configurable: false,
                enumerable: true,
            });
        }

        // 新しいプロパティの追加を禁止
        Object.preventExtensions(current);
    }

    return obj;
}

export const unwritableAndUnconfigurableObj = (): object => {
    const obj = {};
    // 書き込み不可、再定義不可
    Object.defineProperty(obj, "a", {
        value: 1,
        writable: false,
        configurable: false,
        enumerable: true
    });

    // オブジェクトをロック
    // オブジェクトを拡張不可＋プロパティを再定義不可＋オブジェクトの独自データプロパティを読み出し専用に
    Object.freeze(obj);

    return obj;
}

export const writableAndUnconfigurableObj = (): object => {
    const obj = {};
    // 書き込み可、再定義不可
    Object.defineProperty(obj, "b", {
        value: 2,
        writable: true,
        configurable: false,
        enumerable: true
    });

    // オブジェクトを拡張不可＋オブジェクトのすべての独自プロパティを再定義不可に
    Object.seal(obj);

    return obj;
}
