// nav 要素内のリンク (<a>)
document.querySelectorAll('nav a').forEach(a => {
    console.log(`nav 要素内のリンク＜${a.textContent}＞：　`, a.href);
});

// 商品リスト (.product-list) 内の最初の商品 (.product-item)
console.log("商品リスト内の最初の商品：　", document.querySelector('.product-list .product-item:first-child'));

// カートアイコンの画像 (<img>)
console.log("カートアイコンの画像：　", document.querySelector('.cart img').src);

// 商品リスト (.product-list) 内の価格 (.price) を表示する要素
// console.log("商品リスト内の価格：　", document.querySelector('.product-list .product-item .price').textContent);
document.querySelectorAll('.product-list>.product-item').forEach(item => {
    console.log(`商品リスト内の価格＜${item.querySelector('img').alt}＞：　`, item.querySelector('.price').textContent);
});

// 商品リスト (.product-list) 内の全ての商品 (.product-item) の画像 (<img>)
document.querySelectorAll('.product-list>.product-item').forEach(item => {
    console.log("商品リスト内の全ての商品画像：　", item.querySelector('img'));
});

// 検索バー (.search-bar) 内の検索ボタン (<button>)
console.log("検索バー内の検索ボタン：　", document.querySelector('.search-bar button'));

// フッター (footer) 内のパラグラフ (<p>) 要素
console.log("フッター内のパラグラフ：　", document.querySelector('footer p'));

// 商品リスト (.product-list) 内の偶数番目の商品 (.product-item)
// :nth-child(even) → 親の中で偶数番目の子要素 にマッチ
document.querySelectorAll('.product-list .product-item:nth-child(even)').forEach((item, index) => {
    console.log(`${(index + 1) * 2}番目の商品：　`, item);
});

// ヘッダー (header) 内のアカウントリンク (.account) の画像 (<img>)
console.log("ヘッダー内のアカウントリンクの画像：　", document.querySelector('header .account img').src);

// ナビゲーションリンクのうち、"会社情報" のリンク
document.querySelectorAll("nav a").forEach(a => {
    if (a.textContent === "会社情報") {
        console.log("ナビゲーションリンク内の会社情報リンク：　", a.href);
    }
});
