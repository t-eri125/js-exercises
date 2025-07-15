# 9.9
「SOLID 原則」とは、オブジェクト指向の設計原則として従うべき 5 つの原則である。

- 単一責任の原則 (single-responsibility principle)
- 開放閉鎖の原則（open/closed principle）
- リスコフの置換原則（Liskov substitution principle）
- インターフェース分離の原則 (Interface segregation principle)
- 依存性逆転の原則（dependency inversion principle）

1. これら 5 つの原則についてそれぞれ説明しなさい
2. 5 つの原則から任意の 1 つ以上を選び、原則を満たさないコードと原則を満たすコードの例を書きなさい
   - コードは各原則を説明するためのスケルトンコードで良く、実際に動作する必要はない

### 単一責任の原則 (single-responsibility principle)
**1つのクラスには1つの責任だけ、変更理由も一つだけであるべき**

モジュール、クラスまたは関数は、単一の機能について責任を持ち、その機能をカプセル化するべきであるという原則（[Wikipedia](https://ja.wikipedia.org/wiki/%E5%8D%98%E4%B8%80%E8%B2%AC%E4%BB%BB%E3%81%AE%E5%8E%9F%E5%89%87)）
<br>ロバート・C・マーティンの記事『The Principles of OOD』によって定義

# 開放閉鎖の原則（open/closed principle）
**既存のコードを修正せずに拡張しやすくあるべき（インターフェース、抽象クラスなど）**

ソフトウェア要素（クラス、モジュール、関数など）は、拡張に対しては開いており、修正に対しては閉じているべきであるという原則（[Wikipedia](https://ja.wikipedia.org/wiki/%E9%96%8B%E6%94%BE/%E9%96%89%E9%8E%96%E5%8E%9F%E5%89%87)）
<br>1988年にバートランド・メイヤーが提唱したものと、1996年頃にロバート・C・マーチン（英語版）らが提唱したものの二通りがある。

# リスコフの置換原則（Liskov substitution principle）
**子クラスは親クラスを正しく継承した設計であるべき**

サブタイプのオブジェクトはスーパータイプのオブジェクトの仕様に従わなければならない、という原則（[Wikipedia](https://ja.wikipedia.org/wiki/%E3%83%AA%E3%82%B9%E3%82%B3%E3%83%95%E3%81%AE%E7%BD%AE%E6%8F%9B%E5%8E%9F%E5%89%87)）
<br>1987年10月のOOPSLAでのバーバラ・リスコフの基調講演 “Data abstraction and hierarchy”[1]にて、インフォーマルな形で紹介された。

# インターフェース分離の原則 (Interface segregation principle)
**使わないコードの影響を受けないように適切に細分化されているべき**

使用しないメソッドにコードを強制的に依存させてはならない、という原則（[Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E5%88%86%E9%9B%A2%E3%81%AE%E5%8E%9F%E5%89%87)）

# 依存性逆転の原則（dependency inversion principle）
**呼び出しているもの（依存先）が変わっても、呼び出し元（依存側）に影響が出ないようにすべき。抽象(共通のインターフェース)を作り、どちらもそれに依存するようにすべき。**

1. 上位モジュールはいかなるものも下位モジュールから持ち込んではならない。双方とも抽象（例としてインターフェース）に依存するべきである。
2. 抽象は詳細に依存してはならない。詳細（具象的な実装内容）が抽象に依存するべきである。
（[Wikipedia](https://ja.wikipedia.org/wiki/%E4%BE%9D%E5%AD%98%E6%80%A7%E9%80%86%E8%BB%A2%E3%81%AE%E5%8E%9F%E5%89%87)）
<br>ロバート・C・マーティンによって確立
