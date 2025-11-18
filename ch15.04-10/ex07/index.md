## 問題 15.4-10.7 🖋️
.png 画像や .jpeg 画像と比べた際の SVG のメリット・デメリットを調査しなさい。

### 回答

#### メリット
- png と同様にロスレス。品質が高い状態を保て、拡大縮小やサイズ変更しても画質がほとんど劣化しない。
- XML ベースのため、HTML や JavaScript、CSS で制御できる。
（テキストを更新することで、グラフィックエディターを使用せずに簡単にローカライズ可能）
- コードなので最適化してファイルサイズを小さくできる。
（サイトの読み込み速度が速い。）
- 検索エンジンに認識される。テキストベースなため SEO 対策になる。


#### デメリット

- 詳細な写真・複雑な画像には不向き。
（画面ロード時にレンダリングするため、大量のデータ、複雑なデータの処理はPCに負担がかかる。また、コードの管理も大変になる）
- 未対応のブラウザがある。
（IE以外の主要ブラウザは対応済み）
- 文字をそのまま扱うと、フォントが勝手に置き換わる可能性がある。事前のアウトライン化が安全
- XML ベースであるため、XSS 攻撃や XXE 攻撃についても念頭に置く必要がある。
- 幅広い設計や埋め込みには、特別なツールが必要になる（Adobe Illustrator など）

#### 参考
https://kinsta.com/jp/blog/svg-vs-png/
https://www.landinghub.net/columns/image-svg
https://alegbit.co.jp/what-is-svg/
https://www.creal.co.jp/column/website-design/9784/?utm_source=chatgpt.com
https://alegbit.co.jp/what-is-svg/?utm_source=chatgpt.com
https://japanese.opswat.com/blog/svg-unveiled-understanding-xxe-vulnerabilities-and-defending-your-codebase
