# 第17章 課題17.1 対応まとめ

インストールしたときについては以下に記載 
..\インストール手順.md

## ① ESLint / Prettier を scripts から実行

**package.json**

```json
"scripts": {
  "lint": "eslint ./ex01/*.js",
  "format": "prettier --write ./ex01/*.js"
}
```

* `lint`：ex01 配下のJSを ESLint でチェック
* `format`：ex01 配下のJSを Prettier で自動整形（`--write`）

※ ファイルを指定して実行



## ② Google Style に従う設定

**.eslintrc.json**

```json
{
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "extends": ["google", "prettier"]
}
```

* `google`：Google JavaScript Style Guide 適用
* `prettier`：整形ルールを無効化し、フォーマットは Prettier に一本化

---

## ③ format_sample.js は lint 対象から除外

**.eslintignore**

```
ex01/format_sample.js
```

* 警告を修正せず、設定で除外

---

## ④ lint_sample.js は警告を修正

`npm run lint` で確認し、警告が出ない状態に修正ずみ

---
