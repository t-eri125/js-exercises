/** 
 * 極座標 r と theta をプロパティにもち、ゲッターとセッターをもつ読み書き可のアクセサプロパティとして
 * デカルト座標 x と y をもつオブジェクトを実装しなさい。
 * 
 * セッターメソッドにおいて x と y それぞれに NaN が設定される場合にはエラーにしなさい。
 */
export const pointObj = {
  r: 2.0,
  theta: Math.PI / 4,

  // getterでは、p166,167のsetで設定していたxとyを逆に取得する
  get x() { return this.r * Math.cos(this.theta); },  // デカルト座標xを設定
  get y() { return this.r * Math.sin(this.theta); },  // デカルト座標yを設定

  // setterでは、p166,167のgetで取得していたrとthetaを逆に設定する
  set x(value) {
    if (Number.isNaN(value)) {
      // セッターメソッドにおいて x と y それぞれに NaN が設定される場合にはエラー
      throw new Error("x に NaN は設定不可")
    };
    // p167より
    this.r = Math.hypot(value, this.y);
    this.theta = Math.atan2(this.y, value);
  },

  set y(value) {
    if (Number.isNaN(value)) {
      // セッターメソッドにおいて x と y それぞれに NaN が設定される場合にはエラー
      throw new Error("y に NaN は設定不可")
    };
    // p167より
    this.r = Math.hypot(this.x, value);
    this.theta = Math.atan2(value, this.x);
  }
}
