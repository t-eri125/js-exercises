/**
 * 以下の仕様に基づいて RPG の戦士クラスと魔力を持った戦士である魔法戦士クラスを
 * それぞれ class を使った記法と prototype を使った記法で実装しなさい。
 * 
 * 仕様
 * ・戦士は攻撃力 atk フィールドを持つ
 * ・戦士は攻撃 attack メソッドを持つ
 * ・attack メソッドはそのインスタンスの atk の 2 倍の値をダメージとして返す
 * ・魔法戦士は戦士を継承する
 * ・魔法戦士は魔力 mgc フィールドを持つ
 * ・魔法戦士の attack は戦士としての attack の値に
 * 　そのインスタンスの mgc の値を加算した値をダメージとして返す
 */

// 
// classを使った記法
// 
export class SoldierClass {
    // 戦士は攻撃力 atk フィールドを持つ
    atk: number;
    constructor(atk: number) {
        this.atk = atk;
    }

    // 戦士は攻撃 attack メソッドを持つ
    // attack メソッドはそのインスタンスの atk の 2 倍の値をダメージとして返す
    attack(): number {
        return this.atk * 2;
    }
}

// 魔法戦士は戦士を継承する
export class MagicWarriorClass extends SoldierClass {
    // 魔法戦士は魔力 mgc フィールドを持つ
    mgc: number;
    constructor(atk: number, mgc: number) {
        super(atk);     // 戦士のコンストラクタを呼ぶ
        this.mgc = mgc;
    }

    // 魔法戦士の attack は戦士としての attack の値に
    // そのインスタンスの mgc の値を加算した値をダメージとして返す
    attack(): number {
        // 戦士のattackメソッドを呼んで計算し、オーバーライド
        return super.attack() + this.mgc;
    }
}

// 
// prototype を使った記法
// 

// 戦士用のコンストラクタ関数
export function SoldierPrototype(this: any, atk: number) {
    // 戦士は攻撃力 atk フィールドを持つ
    this.atk = atk;
}

// attack メソッドを定義する
// ・戦士は攻撃 attack メソッドを持つ
// ・attack メソッドはそのインスタンスの atk の 2 倍の値をダメージとして返す
SoldierPrototype.prototype.attack = function () {
    return this.atk * 2;
};

// 魔法戦士（サブクラス）用のコンストラクタ関数
export function MagicWarriorPrototype(this: any, atk: number, mgc: number) {
    SoldierPrototype.call(this, atk); // Warrior のコンストラクタを継承
    this.mgc = mgc;
}

// Warrior プロトタイプを継承する
MagicWarriorPrototype.prototype = Object.create(SoldierPrototype.prototype);
// constructor プロパティを定義する
MagicWarriorPrototype.prototype.constructor = MagicWarriorPrototype;

// attack() メソッドをオーバーライド
MagicWarriorPrototype.prototype.attack = function () {
    // 親の attack を呼んで mgc を加算
    return SoldierPrototype.prototype.attack.call(this) + this.mgc;
};
