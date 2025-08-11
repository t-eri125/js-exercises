let scope = "global scope"; // グローバル変数。
function checkscope() {
    let scope = "local scope"; // ローカル変数。
    function f() { return scope; } // ここでのスコープ中での値を返す。
    return f;
}
let s = checkscope()(); // 何が返されるか？
console.log(s); // => local scape
