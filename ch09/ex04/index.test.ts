import { SoldierClass, MagicWarriorClass, SoldierPrototype, MagicWarriorPrototype } from './index.ts'; // 適宜パス調整

function testFn(name: string, Soldier: any, MagicWarrior: any) {
    describe(`${name} の場合`, () => {
        test('戦士に atk=10 をセットでき、attack は atk × 2 = 20 を返す', () => {
            const soldier = new Soldier(10);
            expect(soldier.atk).toBe(10);
            expect(soldier.attack()).toBe(20);
        });

        test('魔法戦士に atk=10 と mgc=20 をセットでき、attack は attack + mgc = 40 を返す', () => {
            const magicWarrior = new MagicWarrior(10, 20);
            expect(magicWarrior.atk).toBe(10);
            expect(magicWarrior.mgc).toBe(20);
            expect(magicWarrior.attack()).toBe(10 * 2 + 20);
        });

        test('魔法戦士は戦士のインスタンスである', () => {
            const magicWarrior = new MagicWarrior(1, 1);
            expect(magicWarrior instanceof Soldier).toBe(true);
        });
    });
}

testFn('class', SoldierClass, MagicWarriorClass);
testFn('prototype', SoldierPrototype, MagicWarriorPrototype);
