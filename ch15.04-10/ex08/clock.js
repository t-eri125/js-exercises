// 【追加】
window.addEventListener("load", function () {
    // 秒針の追加（SVG 用に createElementNS を使う）
    const secline = document.createElementNS("http://www.w3.org/2000/svg", "line");
    secline.setAttribute("class", "secondhand");
    secline.setAttribute("x1", "50");
    secline.setAttribute("y1", "50");
    secline.setAttribute("x2", "50");
    secline.setAttribute("y2", "20");
    secline.setAttribute("stroke-width", "2");
    secline.setAttribute("stroke", "red");
    document.querySelector("#clock .hands").appendChild(secline);

    // 時計の初期化
    updateClock();
});

function updateClock() { // SVG 時計の画像を更新して現在時刻を表示する。
    let now = new Date(); // 現在時刻。
    let sec = now.getSeconds(); // 秒。
    let min = now.getMinutes() + sec / 60; // 小数部を持つ分。
    let hour = (now.getHours() % 12) + min / 60; // 小数部を持つ時。

    let secangle = sec * 6; // 【追加】1 秒あたり6 度。
    let minangle = min * 6; // 1 分あたり6 度。
    let hourangle = hour * 30; // 1 時間あたり30 度。

    // 時計の針のSVG 要素を取得する。
    let sechand = document.querySelector("#clock .secondhand"); // 【追加】
    let minhand = document.querySelector("#clock .minutehand");
    let hourhand = document.querySelector("#clock .hourhand");

    // SVG 属性を設定して、時計盤の中で回転する。
    sechand.setAttribute("transform", `rotate(${secangle},50,50)`); // 【追加】
    minhand.setAttribute("transform", `rotate(${minangle},50,50)`);
    hourhand.setAttribute("transform", `rotate(${hourangle},50,50)`);

    // 【修正】1 秒後にこの関数を再度実行する。
    setTimeout(updateClock, 1000);
}
