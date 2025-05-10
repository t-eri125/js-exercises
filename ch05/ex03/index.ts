/** 
 * "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"の
 * いずれかの文字列リテラルを受け取って、
 * その月の日数が31であれば true、
 * そうでなければ false を返すメソッドを書きなさい。
 * if-else を使うバージョンと switch を使うバージョンの両方を作りなさい。
 */

// 文字列をキーとして月の数値を値に持つオブジェクトを用意する
// 引数の文字列を数値に変換し、その月の日数をDate関数で取得する
// 日数が31だったらtrue, それ以外だったらfalseを返す

// if-else文の例
export const getDaysInMonthIf = (selectMonth: string) => {
  const numMonth: { [key: string]: number } = {
    Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
  };

  const lastDays: number = new Date(2025, numMonth[selectMonth], 0).getDate();

  if (lastDays === 31) {
    return true;
  } else {
    return false;
  }
}

// switch分の例
export const getDaysInMonthSwitch = (selectMonth: string) => {
  const numMonth: { [key: string]: number } = {
    Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
  };

  const lastDays: number = new Date(2025, numMonth[selectMonth], 0).getDate();

  switch (lastDays) {
    case 31:
      return true;
      break;
    default:
      return false;
      break;
  }
}
