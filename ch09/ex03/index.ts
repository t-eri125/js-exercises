// クラスを入れ込む場合
export function closurePositiveNumber(initialX: number) {

    // クラスを入れる
    class PositiveNumber {
        #x: number = 0; // プライベートフィールド

        constructor(x: number) {
            if (x <= 0) {
                throw new Error("require : x > 0");
            }
            this.#x = x;
        }

        getX() {
            return this.#x;
        }

        setX(newX: number) {
            if (newX <= 0) {
                throw new Error("require : x > 0");
            }
            this.#x = newX;
        }
    }

    // ポイント：クラスのインスタンスを返す
    return new PositiveNumber(initialX);
}

// ゲッターセッターで実装する場合

// export function closurePositiveNumber(initialX: number) {
//     let x = initialX;       // ローカル関数
//     if (x <= 0) {
//         throw new Error("require : x > 0");
//     }

//     return {
//         get getX() {
//             return x;
//         },
//         set setX(newX: number) {
//             if (newX <= 0) {
//                 throw new Error("require : x > 0");
//             }
//             x = newX;
//         }
//     };
// }
