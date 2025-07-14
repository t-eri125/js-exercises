# メモ
以下のコードはSimpleListを継承して要素のpush回数を記録するInstrumentedSimpleListを実装した例である。 しかし、このコードは想定した通りに動作しない。テストコードで正しく動作していないことを確認しなさい。

### 実行結果
```
InstrumentedLinkedList > #pushAll  

expect(received).toBe(expected) // Object.is equality

Expected: 2
Received: 4
```

原因は、`super.pushAll(...items);` で親クラスの呼び出しをした際にすでに加算されているにもかかわらず、`this.#pushCount += items.length;` で再度加算していたため
