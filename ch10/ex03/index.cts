// 関数とクラスをインポート
const load = require("./load.cts");

// インスタンスを生成
let newSoldier = new load.Soldier("taro", 100);
newSoldier.showStatus();    // => taro の攻撃力: 100

// 攻撃力を増加する関数を実行
load.increaseAttack(newSoldier, 250);
newSoldier.showStatus();    // => taro の攻撃力: 350
