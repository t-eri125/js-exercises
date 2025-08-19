// 与えられたバイト列に対し、そのバイナリデータのファイル種別を返す関数 detectFileType を書きなさい。
// 考えられる全てのファイル種別に対応することは現実的ではないため、与えられたテストコードに対して動作する関数を書けば十分とする。

const fileType: { [key: string]: number[][] } = {
  PDF: [
    [0x25, 0x50, 0x44, 0x46, 0x2d]
  ],
  ZIP: [
    [0x50, 0x4b, 0x03, 0x04],
    [0x50, 0x4b, 0x05, 0x06],
    [0x50, 0x4b, 0x07, 0x08]
  ],
  GIF: [
    [0x47, 0x49, 0x46, 0x38, 0x37, 0x61],
    [0x47, 0x49, 0x46, 0x38, 0x39, 0x61]
  ],
  PNG: [
    [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]
  ]
};

export function detectFileType(input: ArrayBuffer): string {
  // 引数を Uint8Array に変換
  const bytes = new Uint8Array(input);

  for (const key in fileType) {
    const signatures = fileType[key];

    // それぞれのシグネチャを順番にチェック
    for (const sig of signatures) {
      let flag = true;  // 一致しているかどうかを示すフラグ
      for (let i = 0; i < sig.length; i++) {
        if (bytes[i] !== sig[i]) {
          // 一致しなかったらフラグを false にしてループを抜ける
          flag = false;
          break;
        }
      }
      // シグネチャが一致していたら、ファイルタイプを返す
      if (flag) {
        return key;
      }
    }
  }

  // どれにも当てはまらなければ UNKNOWN を返す
  return "UNKNOWN";
}
