## 問題 13.7 🖋️

以下の各関数を実行すると何が出力されるか予想し実際に確認しなさい。
またその理由を 2、3 行のテキスト、図のいずれかまたは両方で説明しなさい。テキスト・図は問題 13.2 を参考にしなさい。

```js
async function h1() {
  try {
    await wait3();
    logA();
    await wait2();
    logB();
    await wait1();
    logC();
  } catch (e) {
    log(e.message);
  }
}

function h2() {
  // NOTE: h3 との比較用
  new Promise(() => {
    errX();
  }).catch((e) => log(e.message));
}

function h3() {
  // NOTE: new Promise の引数が async function の場合、例外はどう扱われるだろう
  new Promise(async () => {
    errX();
  }).catch((e) => log(e.message));
}

async function h4() {
  // NOTE: 2つの例外は両方 catch できるか？
  try {
    const p1 = wait2().then(() => {
      errX();
    });
    const p2 = wait1().then(() => {
      errY();
    });
    await p1;
    await p2;
  } catch (e) {
    log(e.message);
  }
}
```

## 予想
### h1()
#### 回答:
`3秒後に A が出力され、その2秒後に B が出力され、その1秒後に C が出力される。`

#### 説明:
```
wait3 の解決後に logA が実行され、wait2 の解決後に logB が実行され、wait1 の解決後に logC が実行されるため。
await によって順番に処理が待機されるため、A → B → C の順で出力される。
特にエラーはキャッチしない。
```

### h2()
#### 回答:
`すぐに X が出力される`

#### 説明:
```
new Promise の executor 内で同期的に例外を throw すると new Promise は自動的に reject される。
その後エラーは catch されてエラーメッセージ log(e.message) が実行されるため。（resolve/reject は記述不要）
```

### h3()
#### 回答:
`何も出力されない。`

#### 説明:
Promise終了後にコンソールにエラーは表示される
```
executor が async 関数（非同期）の場合、即座に Promise が返され new Promise はその内部の結果に関わらず自動的に resolve される。
その後 executor 内部の例外で Promise が拒否されるが、外側の new Promise の catch には伝わらずエラーは catch されないため。
```


### h4()
#### 回答:
`2秒後に X が出力される`

#### 説明:
何も出力されない。（終了後にコンソールにエラーは表示される）
どちらの例外も catch できない

```
p1, p2 が定義された段階で、非同期でほぼ同時に開始される。
await により p1 が Promise を返すまで次の行の実行は待機するが、裏で Promise はどちらも進んでいる。
そして p2 の wait1 が先に解決して errY() が throw されて Promise が reject するが、await p2 で受け取れない（p1 完了待ち）状態のため、ただエラーが throw されて全体の処理が止まる。
```

