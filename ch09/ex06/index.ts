// 例 9-6 の TypedMap を継承ではなくコンポジションを使って書き換えなさい。
// 処理を完全に Map に委譲するメソッドはテストを省略してもよい。

// class TypedMap extends Map {
//     constructor(keyType, valueType, entries) {
//         // entries が指定されている場合、型をチェックする。
//         if (entries) {
//             for (let [k, v] of entries) {
//                 if (typeof k !== keyType || typeof v !== valueType) {
//                     throw new TypeError(`Wrong type for entry [${k}, ${v}]`);
//                 }
//             }
//         }
//         // （型チェックされた）entries を使って、スーパークラスを初期化する。
//         super(entries);
//         // 次に、型を保存して、サブクラスを初期化する。
//         this.keyType = keyType;
//         this.valueType = valueType;
//     }
//     // set() メソッドを再定義して、マップに追加されるキーと値のペアに対して
//     // 型チェックを行うようにする。
//     set(key, value) {
//         // key やvalue の型が異なっている場合は、エラーをスローする。
//         if (this.keyType && typeof key !== this.keyType) {
//             throw new TypeError(`${key} is not of type ${this.keyType}`);
//         }
//         if (this.valueType && typeof value !== this.valueType) {
//             throw new TypeError(`${value} is not of type ${this.valueType}`);
//         }
//         // 型が正しい場合、スーパークラスのset() メソッドを呼び出し、
//         // エントリをマップに追加する。スーパークラスから返されたものを
//         // そのまま返す。
//         return super.set(key, value);
//     }
// }

export class TypeMap {
    // TypeScript のため、事前にプロパティを宣言
    private map: Map<unknown, unknown>;
    private keyType: string;
    private valueType: string;

    constructor(keyType: string, valueType: string, entries?: [unknown, unknown][]) {
        // 初期化処理では、委譲先となるMap オブジェクトを生成する。
        this.map = new Map();       /* ここを変更 */
        // 次に、型を保存して、サブクラスを初期化する。
        this.keyType = keyType;
        this.valueType = valueType;

        // entries が指定されている場合、型をチェックする。
        if (entries) {
            for (let [k, v] of entries) {
                if (typeof k !== keyType || typeof v !== valueType) {
                    throw new TypeError(`Wrong type for entry [${k}, ${v}]`);
                }
                this.map.set(k, v);     /* 型チェック済みのため map の set() メソッドで初期データを登録 */
            }
        }
    }

    // set() メソッドを再定義して、マップに追加されるキーと値のペアに対して
    // 型チェックを行うようにする。
    set(key: unknown, value: unknown): Map<unknown, unknown> {
        // key やvalue の型が異なっている場合は、エラーをスローする。
        if (this.keyType && typeof key !== this.keyType) {
            throw new TypeError(`${key} is not of type ${this.keyType}`);
        }
        if (this.valueType && typeof value !== this.valueType) {
            throw new TypeError(`${value} is not of type ${this.valueType}`);
        }
        // 型が正しい場合、スーパークラスのset() メソッドを呼び出し、
        // エントリをマップに追加する。スーパークラスから返されたものを
        // そのまま返す。
        return this.map.set(key, value);   /* ここを変更 */
    }

    // これ以外のメソッドは完全に委譲するため、省略
    // 2025/07/18 ここを追加していなかったため修正
    get(key: unknown) {
        return this.map.get(key);
    }
}

