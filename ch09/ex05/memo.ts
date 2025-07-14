export function instanceOf(object: object, constructor: Function) {
    if (object == null || typeof object !== 'object') {
        // object がオブジェクトではない場合
        return false;
    }

    let objPrototype = Object.getPrototypeOf(object);
    const parentPrototype = constructor.prototype;

    // 多段に継承されている場合、
    while (objPrototype) {
        if (objPrototype === parentPrototype) {
            // 調べたい object の prototype が親の prototype と等価な場合
            // trueを返す
            return true;
        }
        // プロトタイプが一致しなかった場合、さらに親の
        objPrototype = Object.getPrototypeOf(objPrototype);
    }

    constructor.isPrototypeOf(object);  // コンストラクタ関数（親）の prototype


}