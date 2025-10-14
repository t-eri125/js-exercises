export class MyArrayLike {
  // 配列のように数値インデックスと length を用意
  [index] = undefined; // インデックスアクセス用
  length = 0;

  constructor(items = []) {
    this.length = 0;

    if (typeof items === "number") {
      // 数値が渡された場合、長さが指定された空配列を作成
      this.length = items;
    } else if (Array.isArray(items) || typeof items[Symbol.iterator] === "function") {
      // 配列が渡された場合、配列かオブジェクトか判断して要素をコピー
      let i = 0;
      for (const v of items) {
        this[i++] = v;
        this.length++;
      }
    }
  }

  // 14.4.1, 12章、13.4.2
  [Symbol.iterator]() {
    let index = 0;
    const len = this.length;
    return {
      next: () => (
        index < len
          ? { value: this[index++], done: false }
          : { value: undefined, done: true }       // 最後に終了
      ),
    };
  }
}

export class MyArray extends Array {
  constructor(items) {
    super(...items);
  }

  // TODO
  // map(), slice() などで返す型を MyArrayLike にする
  // 14.4.4
  static get [Symbol.species]() {
    return MyArrayLike;
  }
}
