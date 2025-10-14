##　問題 15.1-3.4 🖋
グローバルオブジェクトを参照する方法を、ブラウザ内、node 内、ブラウザ node 問わずの３種記しなさい。
また、ブラウザと node のグローバルオブジェクトのプロパティやメソッドを比較し、ブラウザ独自のものを 10 程度記しなさい。
最後に、グローバルオブジェクトに undefined が定義されていることを確認し、過去の ES 仕様でどのような問題が発生していたかを記しなさい。

### 回答
| 実行環境            | グローバルオブジェクトの参照方法       |
| ------------------ | ---------------------- |
| ブラウザ        | `window`, `self`, `frames`   |
| node        | `global`               |
| ブラウザ node 共通 | `globalThis` |
（Worker 内では WorkerGlobalScope がグローバルオブジェクトのため、window は存在しない）


#### ブラウザ独自のものを 10 程度
1. document
　window.document は、ウィンドウに含まれている文書への参照を返します。
2. frameElement
　（`<iframe>` や `<object>`のような）ウィンドウが埋め込まれた要素を返します。
3. history
　Window.history は読み取り専用プロパティで、 History オブジェクトへの参照を返します。
4. location
　Window.location は読み取り専用プロパティで、現在の文書の現在位置についての情報を持つ Location オブジェクトを返します。
5. menubar
　menubar オブジェクトを返します。
6. screen
　Window の screen プロパティは、ウィンドウに関連付けられた画面オブジェクトへの参照を返します。
7. alert()
　Window.alert() は、任意のメッセージを含むダイアログを表示し、ユーザーがそのダイアログを閉じるまで待機します。
8. confirm()
　Window.confirm() はブラウザーへ任意のメッセージ付きのダイアログを表示し、ユーザーがダイアログを承認またはキャンセルするまで待機します。
9. fetch()
　fetch() は Window インターフェイスのメソッドで、ネットワークからリソースを取得するプロセスを開始し、レスポンスが利用できるようになったら履行されるプロミスを返します。
10. scroll()
　ウィンドウを文書内の特定の位置までスクロールします。


undefined は、グローバルオブジェクトのプロパティです（[MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/undefined)）


ES3 までは予約語ではなかったため、設定可、書込可であった。そのため、自由に書き換えられてしまい、コードの管理やデバッグが困難になっていた。（[Why 'NaN' and 'Undefined' are not reserved keywords in JavaScript?](https://stackoverflow.com/questions/7173773/why-nan-and-undefined-are-not-reserved-keywords-in-javascript)）

#### 参考
[〈MDN〉Global object](https://developer.mozilla.org/ja/docs/Glossary/Global_object)
[〈MDN〉globalThis](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/globalThis?utm_source=chatgpt.com)
`ウェブ上では window, self, frames を使うことができます。しかし Web Worker は self のみを利用することができます。Node.js はこれらのいずれも利用できず、代わりに global を使用する必要があります。`
