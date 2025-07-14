// 与えられたテストケースを満たすクラス C を作成しなさい。

export class C {
    // クラスを初期化する必要がないため、constructor キーワードや本体を割愛

    private static count = 1;

    // C.method()
    static method() {
        // 静的メソッド（クラスメソッド）が呼ばれた場合、インクリメント
        return C.count++;
    }

    // new C().method()
    method() {
        // インスタンスメソッドが呼ばれた場合、インクリメント
        return C.count++;
    }

    // 静的プロパティの入れ子クラス
    static C = class {
        // C.C.method()
        static method() {
            return C.count++;
        }
        // new C.C().method()
        method() {
            return C.count++;
        }
    };

    // インスタンスプロパティの入れ子クラス
    C = class {
        // new C().C.method()
        static method() {
            return C.count++;
        }
        // new new C().C().method()
        method() {
            return C.count++;
        }
    };
}
