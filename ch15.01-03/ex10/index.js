const div = document.querySelector('div');
const input = document.querySelector('input');

// 初期背景色を white にしておく
div.style.backgroundColor = 'white';

// div 要素をクリックすると input 要素が focus される
div.addEventListener('click', () => {
    input.focus();
});

// div 要素は通常白色で input 要素に focus されると灰色 (silver)になる
input.addEventListener('focus', () => {
    div.style.backgroundColor = "rgb(192, 192, 192)";
});

//  div 要素は input 要素から focus が外れると白色に戻る
input.addEventListener('blur', () => {
    div.style.backgroundColor = 'white';
});

// input 要素に入力された text は div 要素にも表示される
input.addEventListener('input', () => {
    div.textContent = input.value;
});
