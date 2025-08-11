// instanceofと等価な関数 instanceOf(object, constructor)を作成しなさい。 
// 関数内部での instanceof の利用は不可。

// Constructor.prototype が obj の プロトタイプチェーン上にあるかどうか 

// instanceof 演算子の左辺には調べる対象のオブジェクトを記述します。
// 右辺には、クラスを表すコンストラクタ関数を指定します

export function instanceOf(object: object | unknown, constructor: Function) {
    // if (object == null || (typeof object !== 'object' && typeof object !== 'function')) {
    //     // object がオブジェクトではない（null, undefined, プリミティブ値など）場合
    //     return false;
    // }

    // 親のオブジェクト（プロトタイプ）を取得
    let objectProto = Object.getPrototypeOf(object);
    const constructorProto = constructor.prototype;    // コンストラクタのプロトタイプ

    // 多段に継承されている場合、等価である親クラスを見つけるまでループして親をたどる
    while (objectProto) {
        if (objectProto === constructorProto) {
            // 調べたい constructorProto がたどった親の objectProto と等価な場合
            // trueを返す
            return true;
        }
        // プロトタイプが一致しなかった場合、さらに親のオブジェクトを探す
        objectProto = Object.getPrototypeOf(objectProto);
    }
    return false;
}

// isPrototypeOf を使えばほぼ同じ
// export function instanceOf(object: object, constructor: Function) {
//     if (object == null || (typeof object !== 'object' && typeof object !== 'function')) {
//         // object がオブジェクトではない場合
//         return false;
//     }
//     return constructor.prototype.isPrototypeOf(object);
// }
