
let ricoh = ["r", "i", "c", "o", "h"];
delete ricoh[3];  // "o"を削除

console.log(ricoh);  // -> [ 'r', 'i', 'c', <1 empty item>, 'h' ]。要素は空になるがその要素の場所は残る
console.log(ricoh.length);  // -> 5。配列に穴が開くだけで、長さは変わらない。
