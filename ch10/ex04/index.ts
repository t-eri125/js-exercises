// 関数とクラスをインポート
// ②名前変更を伴うインポート
import s from './load.ts';
import { i } from './increaseAttack.ts';

// インスタンスを生成
let newSoldier = new s("taro", 100);
newSoldier.showStatus();    // => taro の攻撃力: 100

// 攻撃力を増加する関数を実行
i(newSoldier, 250);
newSoldier.showStatus();    // => taro の攻撃力: 350
