export class LinkedList {
  #head = null;
  #tail = null;

  constructor() {
    this.#head = null;
    this.#tail = null;
  }

  push(this: any, value: any): void {
    const newNode = { value, next: null };
    if (!this.#head) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      this.#tail.next = newNode;
      this.#tail = newNode;
    }
  }

  pushAll(...items: any[]): void {
    items.forEach((item) => this.push(item));
  }

  toString(): string {
    let current: any = this.#head;
    const values: any[] = [];
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    return "[" + values.join(", ") + "]";
  }
}

/**
 * 要素のpush回数を記録するLinkedList
 */
// export class InstrumentedLinkedList extends LinkedList {
export class InstrumentedLinkedList { // 継承を削除
  #pushCount = 0;
  #list: LinkedList;  // 追加

  // ↓↓ここから追加
  constructor() {
    // 初期化処理では、委譲先となる LinkedList オブジェクトを生成する。
    this.#list = new LinkedList();
  }
  // ↑↑ここまで追加

  /**
   * 要素のpush操作が行われた回数
   */
  get pushCount() {
    return this.#pushCount;
  }

  push(item: any) {
    // super.push(item);    // 削除
    this.#list.push(item);  // 追加（内部のリストに追加）
    this.#pushCount++;
  }

  pushAll(...items: any[]) {
    // super.pushAll(...items);         // 削除
    // this.#pushCount += items.length; // 削除

    // ↓↓ここから追加
    // オーバーライド済みの push を利用する
    items.forEach((item) => this.push(item));
    // ↑↑ここまで追加
  }

  // ↓↓ここから追加
  // 内部リストの文字列表現を返す
  toString() {
    return this.#list.toString();
  }
  // ↑↑ここまで追加
}
