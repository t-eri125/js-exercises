# 8.7 https://www.ricoh.co.jp を開き、ロードされている js ファイル中で名前空間としての関数の即時関数実行式を使っている js ファイルを 1 つ以上見つけて URL を記載しなさい。
ヒント: ロードされている js ファイル一覧は Chrome ではデベロッパーツールを開き"ソース"タブから確認できる

### 回答
関数宣言文
[globalnavi.js](https://www.ricoh.co.jp/-/Media/Ricoh/Common/cmn_v2/js/globalnavi.js)

```js
;(function($) {
    //===================================== init var
    var $window;
    var $document;
    var $header;
    
    // ～～～

})(jQuery);
```

アロー関数の即時関数実行式（名前空間としてではない）
[init.js](https://www.ricoh.co.jp/-/Media/Ricoh/Common/cmn_g_header_footer/js/init.js)
```js
((win, doc) => {
var req = new XMLHttpRequest();
// ～～～
document.body.appendChild(template);
})(window, document);
```

[template.js](https://www.ricoh.co.jp/-/Media/Ricoh/Common/cmn_g_header_footer/js/template.js)
```js
((win, doc) => {
var template = document.createElement("script");
// ～～～
document.body.appendChild(template);
})(window, document);
```
