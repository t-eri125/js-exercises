/**
 * 
 * JavaScript の配列は動的配列である。一般的に動的配列は固定長の配列を用いて実装される。実際に作成してみよう。
 * 以下の makeFixedSizeArray は固定長の配列を返す関数だと考えなさい。
 * この関数を用いて動的配列 DynamicSizeArray を作成しなさい。
 */

// valueは数値に限定しました

// 固定サイズの内部配列の生成。サイズを超えたらエラー
export function makeFixedSizeArray(size: number) {
    const array = new Array(size);
    return {
        get(index: number) {    // 要素を返す
            if (index < 0 || array.length <= index) {
                throw new Error(`Array index out of range: ${index}`);
            }
            return array[index];
        },
        set(index: number, value: number) {    // 要素をセットする
            if (index < 0 || array.length <= index) {
                throw new Error(`Array index out of range: ${index}`);
            }
            array[index] = value;
        },
        length() {      // 長さ（要素数を返す）
            return array.length;
        },
    };
}

export class DynamicSizeArray {
    static INITIAL_SIZE = 4; // 初期サイズ

    len: number;    // 長さ（要素数）
    array: {
        get(index: number): any;
        set(index: number, value: number): void;
        length(): number;
    };  // 固定長配列

    constructor() {
        this.len = 0;   // 初期化
        this.array = makeFixedSizeArray(DynamicSizeArray.INITIAL_SIZE);
    }
    get(index: number) {    // インデックスの値を取得
        /* TODO */
        if (index < 0 || this.len <= index) {
            throw new Error(`Array index out of range: ${index}`);
        }
        return this.array.get(index);   // 固定長配列を使う
    }
    set(index: number, value: number) {    // インデックスに値を設定
        /* TODO */
        if (index < 0 || this.len <= index) {
            throw new Error(`Array index out of range: ${index}`);
        }
        this.array.set(index, value);   // 固定長配列を使う
    }
    length() {    // 要素数を返す
        /* TODO */
        return this.len;    // 固定長配列内での長さ
    }
    push(value: any) {   // 末尾に要素を追加。必要なら倍のサイズに再配置
        /* TODO */
        // this.array に空が無い場合は「再配置」を行う
        if (this.len >= this.array.length()) {
            // 新しい固定長配列を作成
            const old = this.array;
            this.array = makeFixedSizeArray(old.length() * 2);  // 長さが倍の配列を用意
            // 古い配列 (old) の要素を新しい配列にコピー
            for (let i = 0; i < old.length(); i++) {
                this.array.set(i, old.get(i));
            }
        }
        // 要素を追加し、長さをインクリメント
        this.array.set(this.len, value);
        this.len++;
    }
}