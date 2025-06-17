/** 
 * p.157 下部で記載されている
 * テンプレートオブジェクトに存在しないプロパティをあるオブジェクトから削除する restrict() 、
 * あるオブジェクトのプロパティを別のオブジェクトから削除する substract() 関数を
 * 以下の通り実装しなさい。
 * 与えられたテストを全てパスすること。
 */

// 引数
// target 削除先オブジェクト — 削除対象プロパティを適用するもので、オリジナル変更後に返されます。Symbol と継承プロパティは削除対象外です。
// template テンプレートオブジェクト — このオブジェクトに存在しないプロパティは削除先オブジェクトから削除されます。継承プロパティはテンプレートオブジェクトに存在していても削除先オブジェクトが継承プロパティ以外で同名をもつ場合削除対象になります。

// 返値
// 削除先オブジェクトです。
export function restrict(target: any, template: any) {
  for (const key of Object.keys(target)) {
    // Symbol と継承プロパティは考慮しない
    if (!template.hasOwnProperty(key)) {
      // テンプレートオブジェクトに存在しないプロパティの場合
      delete target[key];
    }
  }
  return target;
};

// 引数
// target 削除先オブジェクト — 削除対象プロパティを適用するもので、オリジナル変更後に返されます。Symbol と継承プロパティは削除対象外です。
// sources 削除対象指定オブジェクト (単数または複数) — 削除したいプロパティを含むオブジェクトです。Symbol と継承プロパティは削除対象になりません。

// 返値
// 削除先オブジェクトオブジェクトです。
export function substract(target: any, ...sources: object[]) {
  for (const key of Object.keys(target)) {
    // Symbol と継承プロパティは考慮しない
    for (const source of sources) {
      if (source != null && source.hasOwnProperty(key)) {
        // keyがnullではなく、sourceがkeyを持っている場合
        delete target[key];
      }
    }
  }
  return target;
};
