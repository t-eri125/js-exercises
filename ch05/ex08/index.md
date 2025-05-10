## 問題 5.8

以下のプログラムの出力を予想し、実際の実行結果を確認しなさい。

```js
let x = 0;

for(let i = 1; i <= 5; i++) {
    x = i;
    try {
        throw Error();
    } catch {
        break;
    } finally {
        continue;
    }
}

console.log(x);
```

### 回答

`5`が出力される。
try内ので例外がスローされた後、finallyでループ処理に戻るため、基本的なfor文と同じ挙動をする。

### 実行結果

５