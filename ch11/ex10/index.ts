// 特定の年と月(1-12)を数値の引数で受け取り、その月の日数を返す関数
export function getLastDay(year: number, month: number) {
    return new Date(year, month, 0).getDate();
}

// 期間の開始日と終了日を'YYYY-MM-DD'形式の日付で二つ引数で受け取り、
// その期間(開始日と終了日を含む)の土日以外の日数を返す関数
export function getDaysExcludingWeekends(start: string, end: string) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    // Date形式に変換
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (!regex.test(start) || !regex.test(end)) {
        throw new Error("日付の形式が'YYYY-MM-DD'ではありません");
    }
    if (startDate > endDate) {
        throw new Error("終了日が開始日以前です");
    }

    let current = new Date(start);
    let dayCount = 0;

    // end まで土日ではなかった場合にカウントを増やす
    while (current <= endDate) {
        if (current.getDay() !== 0 && current.getDay() !== 6) {
            dayCount++;
        }
        current.setDate(current.getDate() + 1);  // 日付を一日進める
    }

    return dayCount;
}

// 'YYYY-MM-DD'形式の日付とロケールを引数で受け取り、その日の曜日をロケールの形式の文字列で返す関数
// 参考：Date.prototype.toLocaleDateString()
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
export function getDayOfWeek(dateStr: string, localeStr: string): string {

    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateStr)) {
        throw new Error("日付の形式が'YYYY-MM-DD'ではありません");
    }

    // Date形式に変換
    const date = new Date(dateStr);

    // Intl.DateTimeFormat でロケールに応じた曜日名を取得
    return date.toLocaleDateString(localeStr, { weekday: "long" });
}

// ローカルのタイムゾーンにおいて先月 1 日 0 時 0 分 0 秒の Date オブジェクトを返す関数。
// ただし getMonth、setMonth は利用してはいけない。
export function getFirstDayOfLastMonth(): Date {
    // 文字列から変更して新たな Date オブジェクトを作成
    const now = new Date();
    const isoStr = now.toISOString();    // "YYYY-MM-DDTHH:mm:ss.sssZ"
    const [yearStr, monthStr] = isoStr.split('T')[0].split('-');

    let year: number = parseInt(yearStr);
    let month: number = parseInt(monthStr);

    // 先月に調整
    if (month === 1) {
        year -= 1;
        month = 12;
    } else {
        month -= 1;
    }

    const y = year.toString().padStart(4, '0');
    const m = month.toString().padStart(2, '0');

    return new Date(`${y}-${m}-01T00:00:00`);
}

// console.log(getLastDay(2025, 7));
// console.log(getDaysExcludingWeekends("2024-01-01", "2024-02-29"));
// console.log(getDayOfWeek("2024-01-01", "en-US"));
console.log(getFirstDayOfLastMonth());
