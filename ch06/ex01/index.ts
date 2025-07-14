/** 
 * 文字列をハッシュ値（数値）に変換するハッシュ関数と、
 * ハッシュ関数を用いて文字列から値へのマッピングを行うハッシュテーブルオブジェクト
 * を実装しなさい。 
 * ハッシュテーブルは下記のコードを参考に、以下の要件を満たすようにしなさい。
 */


// ハッシュテーブルに格納されるデータの構造を定義する型（型エイリアス）
// 再帰処理しやすい様に用意
type Entry = {
  key: string;
  value: any;
  next?: Entry;
};

// String.prototype.codePointAt()
// String のメソッドで、指定されたインデックスから始まる文字の Unicode コードポイント値である非負の整数を返す
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt
// https://note.com/egao_it/n/n935b6bfa4bbc

// 方針
// 一文字ずつ変数a,bを用いて変換する →　a,bを更新する　→　数値幅を制限する
function hashFunction(str: string): number {
  let hashValue: number = 0;
  let a: number = 31; // 素数
  let b: number = 23; // 素数

  for (let i = 0; i < str.length; i++) {
    const hash = str.codePointAt(i) || 0;   // 指定した位置の文字の Unicode コードポイント（数値）を取得する
    hashValue = (hashValue * a + hash * b)
    // 衝突を減らすためにaとbを変換
    const tmp = a;
    a = b * 97 + a;
    b = tmp * 93 * b;
  }
  return (hashValue & 0xffffffff) >>> 0; // 32bit正整数に限定
}

export function newHashTable(capacity: number) {
  return {
    size: 0, // マッピング数を示すプロパティ
    entries: new Array(capacity), // マッピングを格納する固定長の配列

    get(key: string): string | undefined {
      // keyにマップされた値を取得する

      // ハッシュ値をサイズに合わせて変換（配列サイズの剰余）してindexとする
      const index = hashFunction(key) % capacity;
      let entry = this.entries[index];  // indexの値をentryに代入、なければundefined

      // インデックスが衝突している（keyが違う）場合にはnextに値が入っているのでリンクリスト形式でたどる
      while (entry) {
        if (entry.key === key) {
          return entry.value;
        }
        entry = entry.next;
      }
      return undefined; // 見つからない場合はundefined
    },

    put(key: string, value: string | Entry | Object) {
      // key, valueのマッピングを追加する(keyが存在する場合はvalueを上書きする)

      // ハッシュ値をサイズに合わせて変換（配列サイズの剰余）してindexとする
      const index = hashFunction(key) % capacity;
      let entry = this.entries[index];  // indexのオブジェクトをentryに代入、なければundefined

      if (!entry) {
        // indexにかぶりがなかったら
        this.entries[index] = { key, value };
        this.size++;  // マッピング数をインクリメント
        return;
      }

      let prev: Entry | undefined;
      let current: Entry | undefined = entry;

      while (current) {
        if (current.key === key) {
          // keyが被っている場合
          current.value = value; // 上書き
          return;
        }
        // keyが被っていない場合
        // 今の値を前の値としてnextの値を今の値に代入してkeyかぶりを再帰敵に確認
        prev = current;
        current = current.next;
      }
      // keyがすべて被っていない場合
      // 最後のnextに新たにkey, valueを追加する
      prev!.next = { key, value };
      this.size++;  // マッピング数をインクリメント
    },

    remove(key: string): boolean {
      // keyのマッピングを削除する

      // ハッシュ値をサイズに合わせて変換（配列サイズの剰余）してindexとする
      const index: number = hashFunction(key) % capacity;
      let current: Entry | undefined = this.entries[index];
      let prev: Entry | undefined;

      while (current) {
        // keyを探す
        if (current.key === key) {
          if (prev) {
            // リストの元があったら、元のnextを自分のnext以降に置き換える
            prev.next = current.next;
          } else {
            // リストの元がなかったら、自分をnext以降に置き換える
            this.entries[index] = current.next;
          }
          this.size--;
          return true;
        }
        prev = current;
        current = current.next;
      }
      return false;   // 最後まで見つからない場合はfalseを返す
    },
  };
}

function sample() {
  const hashTable = newHashTable(10);
  hashTable.put("key1", "value1");
  hashTable.put("key2", { value: "value2" });

  console.log(`size=${hashTable.size}`); // => size=2
  console.log(`key1=${hashTable.get("key1")}`); // => key1=value1
  console.log(`key2=${JSON.stringify(hashTable.get("key2"))}`); // => key2={"value":"value2"}

  hashTable.put("key2", "new value");

  console.log(`key2=${hashTable.get("key2")}`); // => key2=new value

  hashTable.remove("key2");

  console.log(`key2=${hashTable.get("key2")}`); // => key2=undefined
  console.log(`size=${hashTable.size}`); // => size=1
}
