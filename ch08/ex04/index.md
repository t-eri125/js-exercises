# 8.4　以下の入れ子の関数とアロー関数のコード実行結果を予想してから実行し、結果を説明しなさい。

### 予想

```
false, true 
true, false
```

### 結果

```
false, true 
true, false
```

1. obj.om() の呼び出し時点では 通常の関数のメソッド呼びだしなので、this は obj の状態。
2. その後、nest.nm() の呼び出しは、nmは関数宣言文をメソッド呼びだししているため、this は nest となる。
3. そして、nest.arrow() の呼び出しは、「アロー関数の場合、関数が定義された環境のthis キーワードの値を継承」（p.204, l.2）するため、this は obj となる

```js
const obj = {
  om: function () {
    const nest = {
      nm: function () {
        console.log(this === obj, this === nest);
      },
      arrow: () => {
        console.log(this === obj, this === nest);
      },
    };
    nest.nm();
    nest.arrow();
  },
};
obj.om();
```
