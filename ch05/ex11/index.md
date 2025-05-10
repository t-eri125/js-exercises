## 問題 5.11

Node で debugger 文を使ってデバッグする方法を調べなさい。

### 回答

inspect引数の後にデバッグするスクリプトのパスを指定してNode.jsを起動する。
```
node inspect <スクリプト名>
```
デバッガーは、実行可能な最初の行で自動的にブレークする。<br>
最初のブレークポイント（デバッガ・ステートメントで指定）まで実行するには、`NODE_INSPECT_RESUME_ON_START`環境変数を`1`に設定する。
```
NODE_INSPECT_RESUME_ON_START=1 node inspect <スクリプト名>
```

### 関連

コンソールに入力するとデバッグ中に操作できる<br>
`repl`：コードをリモートで評価できる（現在のスコープ内で手動で実行できる）<br>
　`.exit`：replを終了する<br>
`next`：次のステートメントまで1行進む<br>
`help`：他の使用可能な全コマンド一覧を表示<br>
`Enter`：前のデバッガーコマンドを繰り返す（nextを実行した後は、Enterでnextを繰り返せる）<br>

デバッグ中に式の監視をしたい場合<br>
`watch('my_expression')`：監視を開始<br>
`unwatch('my_expression')`：ウォッチャーを削除


参考：[Node公式](https://nodejs.org/api/debugger.html)