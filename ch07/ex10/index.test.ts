import { makeFixedSizeArray, DynamicSizeArray } from './index.ts';
// Jest を使っているなら `import { describe, it, expect } from '@jest/globals'`

// DynamicSizeArray の実装と makeFixedSizeArray が同ファイル内にあると仮定

describe('DynamicSizeArray', () => {
  it('初期状態では長さが 0 であること', () => {
    const arr = new DynamicSizeArray();
    expect(arr.length()).toBe(0);
  });

  it('push で値を追加し、setで値を変更し, get で取得できること', () => {
    const arr = new DynamicSizeArray();
    arr.push(10);
    arr.push(20);
    expect(arr.length()).toBe(2);
    expect(arr.get(0)).toBe(10);
    arr.set(1, 5);
    expect(arr.get(1)).toBe(5);
  });

  it('サイズ以上のインデックスを get すると例外が発生すること', () => {
    const arr = new DynamicSizeArray();
    arr.push(1);
    expect(() => arr.get(1)).toThrow();
    expect(() => arr.get(-1)).toThrow();
  });

  it('存在しないインデックスに set すると例外が発生すること', () => {
    const arr = new DynamicSizeArray();
    expect(() => arr.set(0, 10)).toThrow();
  });

  it('サイズを超えて push すると配列が倍に拡張されて追加できること', () => {
    const arr = new DynamicSizeArray();
    const initialCapacity = 4;

    for (let i = 0; i < initialCapacity; i++) {
      arr.push(i);
    }

    arr.push(5);  // サイズオーバーでも追加できる

    expect(arr.length()).toBe(5);
    expect(arr.get(4)).toBe(5);
    // 元の要素も維持されていること
    for (let i = 0; i < initialCapacity; i++) {
      expect(arr.get(i)).toBe(i);
    }
  });
});
