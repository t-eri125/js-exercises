console.log(Number.MAX_VALUE);       // => 1.7976931348623157e+308: 整数の最大値
console.log(Number.MIN_VALUE);       // => 5e-324: 際数の最小値
console.log(Number.MAX_VALUE + 1);   // => 1.7976931348623157e+308: 整数の最大値+1
console.log((Number.MAX_VALUE + 1) === (Number.MAX_VALUE + 2));   // => true: 最大値+1 === 最大値+2
/**
 * JavaScriptの精度は、-(2**53-1) から2**53-1 の範囲までであり、
 * それ以外では値が下から丸められてしまうため。
*/