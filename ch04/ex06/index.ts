// 何らかのリサイズを行う関数と思って読んで下さい
//
// - params には undefined またはオブジェクトが与えられる
// - params.maxWidth が与えられる場合 (正の整数と仮定して良い) はその値を利用する
// - params.maxHeight が与えられる場合 (正の整数と仮定して良い) はその値を利用する

// 結果確認用（正の整数が与えられている場合、与えられない場合）
const p = { maxWidth: 100, maxHeight: 100 };
const p2 = { maxWidth: null, minHeight: 10 };
console.log("resize");
resize(p), resize(p2);
console.log("resize1");
resize1(p), resize1(p2);
console.log("resize2");
resize2(p), resize2(p2);

// 元の関数
function resize(params: object) {
  let maxWidth = 600;
  let maxHeight = 480;

  if (params && params.maxWidth) {
    maxWidth = params.maxWidth;
  }

  if (params && params.maxHeight) {
    maxHeight = params.maxHeight;
  }

  console.log({ maxWidth, maxHeight });
}

// if を利用せず && や || を用いて maxWidth や maxHeight を設定する関数 (resize1)
function resize1(params: object) {
  let maxWidth = 600;
  let maxHeight = 480;

  // paramsがtrue、paramsがtrue、ならばリサイズの式に到達する
  // どちらかがfalseなら到達しない
  params && params.maxWidth && (maxWidth = params.maxWidth);
  params && params.maxHeight && (maxHeight = params.maxHeight);

  console.log({ maxWidth, maxHeight });
}

// if を利用せず ?. や ?? を用いて maxWidth や maxHeight を設定する関数 (resize2)
function resize2(params: object) {
  let maxWidth = 600;
  let maxHeight = 480;

  // paramsがnull,undefinedなら、undifinedと評価
  // paramsがnull,undefined以外ならparams.maxWidthと評価
  // params.maxWidthがnull,undefinedなら、maxWidthに戻す
  // params.maxWidthがnull,undefined以外なら、左辺で??の左辺で終了
  maxWidth = params?.maxWidth ?? maxWidth;
  maxHeight = params?.maxHeight ?? maxHeight;

  console.log({ maxWidth, maxHeight });
}
