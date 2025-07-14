import { closurePositiveNumber } from "./index.ts"; // ts でも可

// クラスを入れ込む場合
describe('closurePositiveNumber', () => {
    it('正の数 10 の場合、値を保持できる', () => {
        const instance = closurePositiveNumber(10);
        expect(instance.getX()).toBe(10);
    });

    it('0以下の値（0, -10）の場合、エラーを投げる', () => {
        expect(() => closurePositiveNumber(0)).toThrow();
        expect(() => closurePositiveNumber(-10)).toThrow();
    });

    it('getX で値を取得できる', () => {
        const instance = closurePositiveNumber(15);
        expect(instance.getX()).toBe(15);
    });

    it('正の数 20 の場合、 setX で値を更新できる', () => {
        const instance = closurePositiveNumber(10);
        instance.setX(20);
        expect(instance.getX()).toBe(20);
    });

    it('0以下の値（0, -10）の場合、 setX でエラー', () => {
        const instance = closurePositiveNumber(10);
        expect(() => instance.setX(0)).toThrow();
        expect(() => instance.setX(-10)).toThrow();
    });
});

// ゲッターセッターで実装する場合
// describe('closurePositiveNumber', () => {
//     it('正の数 10 の場合、値を保持できる', () => {
//         const instance = closurePositiveNumber(10);
//         expect(instance.getX).toBe(10);
//     });

//     it('0以下の値（0, -10）の場合、エラーを投げる', () => {
//         expect(() => closurePositiveNumber(0)).toThrow();
//         expect(() => closurePositiveNumber(-10)).toThrow();
//     });

//     it('getX で値を取得できる', () => {
//         const instance = closurePositiveNumber(15);
//         expect(instance.getX).toBe(15);
//     });

//     it('正の数 20 の場合、 setX で値を更新できる', () => {
//         const instance = closurePositiveNumber(10);
//         instance.setX = 20;
//         expect(instance.getX).toBe(20);
//     });

//     it('0以下の値（0, -10）の場合、 setX でエラー', () => {
//         const instance = closurePositiveNumber(10);
//         expect(() => { instance.setX = 0; }).toThrow();
//         expect(() => { instance.setX = -10; }).toThrow();
//     });
// });
