## 問題 17.7 🖋

TypeScriptのトランスパイルは@babel/preset-typescriptやtscによって可能だが、それぞれの違いを調べなさい。

### 回答

| 観点| @babel/preset-typescript | tsc|
| --------- | ------------------------ | ---------------------- |
| 役割| 型注釈を削除してJSに変換する| 型チェックを行いJSに変換する公式コンパイラ |
| 型チェック | ❌ しない。ファイルごとに変換 | ⭕ する。「プロジェクト全体」を見てファイル間の型の整合性までチェック |
| 型エラー時 | エラーがあっても出力する | 設定により出力を止められる|
| `.d.ts`生成 | ❌ できない | ⭕ できる |

その他、実務イメージとして「Babelで変換し、TypeScriptで型チェックのみ行う構成」が紹介（[TypeScript and Babel 7](https://devblogs.microsoft.com/typescript/typescript-and-babel-7/?utm_source=chatgpt.com)）
```
"build": "babel src --out-dir lib", 
"type-check": "tsc --noEmit"
```
・設定ファイルの違い
Babel → babel.config.js や .babelrc で設定
tsc → tsconfig.json で設定

#### 参考
[Configuration File Types](https://babeljs.io/docs/config-files)
[Intro to the TSConfig Reference](https://www.typescriptlang.org/tsconfig/)
[babelは型チェックを行わない](https://babeljs.io/docs/babel-plugin-transform-typescript?utm_source=chatgpt.com#:~:text=language.%20However%2C-,this%20plugin%20does,-not%20add%20the)
[TypeScript: Documentation - Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)
[TypeScript .d.ts生成する](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)