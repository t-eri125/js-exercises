## 問題 1.4

### 予想

{answer: 42}
{answer: 0}

### 結果：開発者ツールを開いた状態のタブで HTML を開く場合

{answer: 42}
{answer: 0}

### 結果：HTML を開いた状態のタブで開発者ツールを開く場合

Object（中身はanswer: 0, [[prototype]]）
Object（中身はanswer: 0, [[prototype]]）

### 修正

**answerを42, 0で表示する**

ブロックを分ける

```js
let life = { answer: 42 };
console.log(life); // => {answer: 42}
{
  let life = { answer: 0 }; // => {answer: 0}
  console.log(life);
}
```

**参考**: [【MDN】　let スコープのルール](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/let#%E3%82%B9%E3%82%B3%E3%83%BC%E3%83%97%E3%81%AE%E3%83%AB%E3%83%BC%E3%83%AB)
