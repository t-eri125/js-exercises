## 問題 5.7

以下のプログラムの出力を予想し、実際の実行結果を確認しなさい。

```js
function f() {
    try {
        return true;
    } finally {
        return false;
    }
}

console.log(f());
```

### 回答

`false`が出力される。
try内のtrueが返された後、finallyも実行されるため、falseで上書きされる。

### 実行結果

false
