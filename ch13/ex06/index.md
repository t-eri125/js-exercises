## 問題 13.6 🖋️

jQuery Deferred について調べ [`Promise`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise) との関係性について説明しなさい。

## 回答
jQuery Deferred は 古くからある jQuery 独自の非同期処理用の機能だが、現在では後続のPromise/Aの仕様に沿っている。 
<br>jQuery.Deferredが生成するオブジェクトで、DeferredはPromiseを内包しています。DeferredとPromiseは常に1対1で作成され、対応するDeferredだけがPromiseの内部状態を変更できます。
→　[参考](https://techblog.yahoo.co.jp/programming/jquery-deferred/)

<br>.done()、.fail()、.always()などはdeffered独自で用意されている。 
<br>.resolveWith(), .rejectWith() でコールバックのコンテキストや引数を指定できる、
<br>内部で doneCallbacks / failCallbacks の配列を使ってコールバック管理できる。
```
deferred.then()、deferred.always()、deferred.done()、deferred.fail()
　→　オブジェクトに追加されたコールバックは、後で実行されるようキューに追加
deferred.resolve()、deferred.resolveWith()
　→　resolved状態に移行
deferred.reject()、 deferred.rejectWith()
　→　rejected 状態に移行し、設定済みの failCallbacks が直ちに実行
```

「2011年1月 jQuery 1.5でDeferred/Promiseが導入されました。 done/fail など利用向けAPIを提供するオブジェクトがPromiseで、Promiseに提供側APIを足したものがDeferredです。」
[（参考）](https://zenn.dev/qnighy/articles/0aa6ec47248d80#:~:text=2011%E5%B9%B41%E6%9C%88%20jQuery%201.5%E3%81%A7Deferred/Promise%E3%81%8C%E5%B0%8E%E5%85%A5%E3%81%95%E3%82%8C%E3%81%BE%E3%81%97%E3%81%9F%E3%80%82%20done/fail%20%E3%81%AA%E3%81%A9%E5%88%A9%E7%94%A8%E5%90%91%E3%81%91API%E3%82%92%E6%8F%90%E4%BE%9B%E3%81%99%E3%82%8B%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%8CPromise%E3%81%A7%E3%80%81Promise%E3%81%AB%E6%8F%90%E4%BE%9B%E5%81%B4API%E3%82%92%E8%B6%B3%E3%81%97%E3%81%9F%E3%82%82%E3%81%AE%E3%81%8CDeferred%E3%81%A7%E3%81%99%E3%80%82)

2016年6月 jQuery 3.0で「jQuery Deferredは、CommonJS Promises/A設計に基づいています。」
[（参考①）](https://api.jquery.com/jQuery.Deferred/)
[（参考②）](https://qiita.com/atti/items/17fd8b11305a5375a1de#:~:text=jQuery%203.x%20%E3%81%A7%E3%81%AF%20then%20%E3%81%AE%E4%BB%95%E6%A7%98%E3%81%8C%20Promises/A%2B%20%E3%81%AB%E5%9F%BA%E3%81%A5%E3%81%8F%E3%82%88%E3%81%86%E3%81%AB%E5%A4%89%E6%9B%B4%E3%81%95%E3%82%8C%E3%81%BE%E3%81%97%E3%81%9F%E3%80%82%E3%81%93%E3%82%8C%E3%81%AF%E3%80%81ES6%20%E3%81%A7%E5%B0%8E%E5%85%A5%E3%81%95%E3%82%8C%E3%81%9F%20Promise%20%E3%81%A8%E4%BA%92%E6%8F%9B%E6%80%A7%E3%82%92%E3%82%82%E3%81%A4%E3%81%9F%E3%82%81%E3%81%A7%E3%81%99%E3%81%8C%E3%80%81jQueryPromise%20%E3%81%AE%20then%20%E3%81%A8%20Promise%20%E3%81%AE%20then%20%E3%81%AE%E6%8C%99%E5%8B%95%E3%81%AF%E5%90%8C%E3%81%98%E3%81%A7%E3%81%AF%E3%81%82%E3%82%8A%E3%81%BE%E3%81%9B%E3%82%93%E3%80%82)



```memo
jQuery Deferredとは
1. 複数のコールバックをコールバック キューに登録し
2. コールバック キューを呼び出し
3. 同期または非同期関数の成功または失敗の状態を中継するメソッドを備えた
連鎖可能なユーティリティ オブジェクトを返すファクトリ関数。
```
