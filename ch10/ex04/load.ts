// 実装的にクラス内にまとめた方がいいかもしれないが、とりあえず別で用意

// 攻撃力を増加させる関数
export function increaseAttack(soldier: { name: string, attack: number }, amount: number) {
    soldier.attack += amount;
}

// 兵士クラス
// ①デフォルトエクスポート
export default class Soldier {
    name: string = "";
    attack: number = 0;

    constructor(name: string, attack: number) {
        this.name = name;
        this.attack = attack;
    }

    showStatus() {
        console.log(`${this.name} の攻撃力: ${this.attack}`);
    }
}
