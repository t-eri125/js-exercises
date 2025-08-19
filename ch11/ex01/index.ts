/**
 * ジェネリクスパターン
 */
// コンストラクタ型の定義
// クラスコンストラクタの場合。T 型の値（インスタンス）が返る
type ClassConstructor<T> = { new(...args: any[]): T }

// プリミティブ値のラッパーコンストラクタの場合。
type PrimitiveConstructor =
    StringConstructor | NumberConstructor | BooleanConstructor | BigIntConstructor | SymbolConstructor;

// プリミティブ値型
type PrimitiveValue =
    string | number | boolean | bigint | symbol;

export class TypeMap {
    private m = new Map();  // 内部保持用 Map

    set<K>(key: ClassConstructor<K> | PrimitiveConstructor, value: K | PrimitiveValue): TypeMap {
        // コンパイル時用のエラー
        // プリミティブの場合
        if (key === String) {
            if (typeof value !== 'string') throw new Error('value が string ではありません');
        } else if (key === Number) {
            if (typeof value !== 'number') throw new Error('value が number ではありません');
        } else if (key === Boolean) {
            if (typeof value !== 'boolean') throw new Error('value が boolean ではありません');
        } else if (key === BigInt) {
            if (typeof value !== 'bigint') throw new Error('value が bigint ではありません');
        } else if (key === Symbol) {
            if (typeof value !== 'symbol') throw new Error('value が symbol ではありません');
        } else {
            // クラスインスタンスの場合
            if (!(value instanceof key)) {
                throw new Error(`value が ${key.name} のインスタンスではありません`);
            }
        }

        this.m.set(key, value);
        return this;    // setを連続で呼べるように this でオブジェクト自体を指定
    }

    get<K>(key: ClassConstructor<K> | PrimitiveConstructor): K | PrimitiveValue | undefined {
        return this.m.get(key);
    }
}
