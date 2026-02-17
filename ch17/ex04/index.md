## 問題 17.4 🖋️

npm install すると作成される package-lock.json はどのような役割を持つのか。
また、リポジトリにコミットすべきか、について説明しなさい。

### 回答

- 依存関係の「正確な」バージョンを記録する
　→　package.json には `^1.2.3` のように範囲指定が書けるため、実際にインストールされた正確なバージョン（例: 1.2.8）を記録する
　→　さらに 間接依存（依存の依存） もすべて記録する
- 環境を完全に再現できるようにする
　→　誰の環境でも同じ依存の木構造を構築でき、再現性を保証できる
- インストールの高速化
　→　依存解決の結果が保存されているため、npm はより効率的にインストールできる。

#### コミットすべきか　→　コミットすべき
package-lock.json は、依存関係の厳密なバージョンと依存ツリーを記録し、環境の再現性を保証するためのファイル。
チーム開発や CI 環境で同一の依存関係を再現するためには、コミットすべきである。

#### 参考

[package.jsonとpackage-lock.jsonとnode_modules](https://zenn.dev/ryuyafujisaki/articles/2ed1bf397b8cfc)
[npm package-lock.json がなぜ必要なのかがわからない](https://ja.stackoverflow.com/questions/42788/npm-package-lock-json-%E3%81%8C%E3%81%AA%E3%81%9C%E5%BF%85%E8%A6%81%E3%81%AA%E3%81%AE%E3%81%8B%E3%81%8C%E3%82%8F%E3%81%8B%E3%82%89%E3%81%AA%E3%81%84)
