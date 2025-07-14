// TypeScript の場合は以下:
import { returnC, returnX2, returnNowTime } from "./index.ts";

describe('returnC', () => {
  let logSpy: jest.SpyInstance;  // ログの出力回数をとる

  // itの前後でリセット
  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
  });
  afterEach(() => {
    logSpy.mockRestore();
  });

  it('正しい場合（n:3, c:"A"）', () => {
    const result = returnC(3, 'A');

    expect(result).toBe('AAA');
    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).toHaveBeenCalledWith('A');
  });

  it('nが0の場合、ログは出力されず空文字を返す', () => {
    expect(() => returnC(-1, 'A')).toThrow(RangeError); // 関数の呼び出しをラップした関数にする（呼び出し時にエラーのため）
    expect(logSpy).toHaveBeenCalledTimes(0);
  });

  it('cが空文字の場合、n回空文字をログ出力し空文字を返す', () => {
    const result = returnC(3, '');

    expect(result).toBe('');
    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).toHaveBeenCalledWith('');
  });

  it('nが負の数の場合は例外を投げる', () => {
    expect(() => returnC(-1, 'A')).toThrow();
    expect(logSpy).toHaveBeenCalledTimes(0);
  });
});

describe('returnX2', () => {
  it('正しい場合（x:3）二乗を返す', () => {
    expect(returnX2(3)).toBe(9);
  });

  it('負の数の場合も正しく二乗を返す（x:-4）', () => {
    expect(returnX2(-4)).toBe(16);
  });

  it('0の場合は0を返す', () => {
    expect(returnX2(0)).toBe(0);
  });
});

describe('returnNowTime', () => {
  it('現在時刻をnowプロパティに持つオブジェクトを返す', () => {
    const result = returnNowTime();

    expect(typeof result).toBe('object');
    expect(result).toHaveProperty('now');
    expect(result.now instanceof Date).toBe(true);
  });
});