import { getLastDay, getDaysExcludingWeekends, getDayOfWeek, getFirstDayOfLastMonth } from './index.ts';

describe('getLastDay', () => {
    it('各月の最終日を返す', () => {
        expect(getLastDay(2025, 1)).toBe(31);
        expect(getLastDay(2025, 2)).toBe(28);
        expect(getLastDay(2024, 2)).toBe(29);
        expect(getLastDay(2025, 4)).toBe(30);
    });

    it('正しくない形式は設定できない', () => {
        // expect(getLastDay("aaa", 1)).toThrow();
        // expect(getLastDay(2000, "1")).toThrow();
    });
});

describe('getDaysExcludingWeekends', () => {
    it('平日のみの日数を返す', () => {
        expect(getDaysExcludingWeekends('2025-08-01', '2025-08-10')).toBe(6);
        expect(getDaysExcludingWeekends('2025-08-04', '2025-08-04')).toBe(1);
        expect(getDaysExcludingWeekends('2025-08-02', '2025-08-03')).toBe(0);
    });

    it('開始日が終了日より後の場合にエラーが出る', () => {
        expect(() => getDaysExcludingWeekends('2025-08-10', '2025-08-01')).toThrow("終了日が開始日以前です");
    });

    it('不正な日付形式の場合にエラーが出る', () => {
        expect(() => getDaysExcludingWeekends('2025/08/01', '2025-08-10')).toThrow("日付の形式が'YYYY-MM-DD'ではありません");
        expect(() => getDaysExcludingWeekends('2025-08-01', '08-10-2025')).toThrow("日付の形式が'YYYY-MM-DD'ではありません");
    });
});

describe('getDayOfWeek', () => {
    it('指定した日付の曜日を返す', () => {
        expect(getDayOfWeek('2025-08-16', 'ja-JP')).toBe('土曜日');
        expect(getDayOfWeek('2025-08-16', 'en-US')).toBe('Saturday');
        expect(getDayOfWeek('2025-08-17', 'ja-JP')).toBe('日曜日');
    });

    it('不正な日付形式の場合にエラーが出る', () => {
        expect(() => getDayOfWeek('2025/08/16', 'ja-JP')).toThrow("日付の形式が'YYYY-MM-DD'ではありません");
        expect(() => getDayOfWeek('16-08-2025', 'ja-JP')).toThrow("日付の形式が'YYYY-MM-DD'ではありません");
    });
});

describe('getFirstDayOfLastMonth', () => {
    it('先月の1日 0:00:00 を返す', () => {
        const result = getFirstDayOfLastMonth();

        expect(result.getFullYear()).toBe(2025);
        expect(result.getMonth()).toBe(6);
        expect(result.getDate()).toBe(1);
        expect(result.getHours()).toBe(0);
        expect(result.getMinutes()).toBe(0);
        expect(result.getSeconds()).toBe(0);
        expect(result.getMilliseconds()).toBe(0);
    });
});