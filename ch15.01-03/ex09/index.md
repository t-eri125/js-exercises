## React, jQuery などの主要なフロントエンドフレームワークを選び、そのフレームワークを使っていればどのように XSS 対策がされるか、また使っていてもどのような XSS の危険が残るか記述しなさい。

### React

#### 対策

- データバインディング（JSX の {value}）で自動的に HTML エスケープを行う
- < → &lt; 等の自動エスケープが行われる

#### 残る危険

- `dangerouslySetInnerHTML` プロパティでは、HTML をエスケープ処理をせずに実行できてしまう
```
const markup = { __html: '<p>some raw html</p>' };
return <div dangerouslySetInnerHTML={markup} />;
```

- v16.9から警告が出るが、`href`にあらゆるスキームを指定できてしまう
- HTMLタグの属性にイベントハンドラ（例：onerrorやonload）が仕込まれる

#### 対策
- ユーザーからの入力を単に{value}で表示して、Reactにエスケープ処理を任せる
- HTMLを埋め込む必要がある場合は、必ずDOMPurifyなどでサニタイズしてから使用する
- hrefなどのURLには許可されたスキームのみを検証して使う
- サーバー側でも入力の検証と適切なエスケープを実施する
- Content Security Policy (CSP)を設定して多層防御を行う

#### 参考
https://azukiazusa.dev/blog/react-javascript-xss/
https://ja.react.dev/reference/react-dom/components/common#common-props
https://qiita.com/Taira0222/items/c3ac3e7c635492d80a9f
