// TypeScript の場合は以下:
import { newHashTable } from "./index.ts";

describe("ハッシュテーブル：newHashTable", () => {
  test("初期状態では size が 0", () => {
    const table = newHashTable(5);
    expect(table.size).toBe(0);
  });

  test("要素を追加し取得する", () => {
    const table = newHashTable(5);
    table.put("key1", "value1");
    expect(table.size).toBe(1);
    expect(table.get("key1")).toBe("value1");
  });

  test("同じキーを上書きすると sizeは変わらず値が更新", () => {
    const table = newHashTable(5);
    table.put("key1", "value1");
    table.put("key1", "VALUE1");
    expect(table.size).toBe(1);
    expect(table.get("key1")).toBe("VALUE1");
  });

  test("異なるキーを追加", () => {
    const table = newHashTable(5);
    table.put("key1", "value1");
    table.put("key2", "value2");
    expect(table.size).toBe(2);
    expect(table.get("key1")).toBe("value1");
    expect(table.get("key2")).toBe("value2");
  });

  test("キーを削除", () => {
    const table = newHashTable(5);
    table.put("key1", "value1");
    table.put("key2", "value2");
    table.remove("key1");
    expect(table.get("key1")).toBeUndefined();
    expect(table.size).toBe(1);
  });

  test("存在しないキーの削除はエラーにならず size は変わらない", () => {
    const table = newHashTable(5);
    table.put("key1", "value1");
    table.remove("key2");
    expect(table.size).toBe(1);
  });

  test("存在しないキーの取得は undefined になる", () => {
    const table = newHashTable(5);
    table.put("key1", "value1");
    expect(table.get("key2")).toBeUndefined();
  });

  test("インデックスが衝突したらリンクリスト形式で追加される", () => {
    const table = newHashTable(1);
    table.put("key1", "value1");
    table.put("key2", "value2");
    table.put("key3", "value3");

    const data1 = table.entries[0];
    expect(table.size).toBe(3);
    expect(data1.key).toBe("key1");
    expect(data1.value).toBe("value1");
    expect(data1.next?.key).toBe("key2");
    expect(data1.next?.value).toBe("value2");
    expect(data1.next?.next?.key).toBe("key3");
    expect(data1.next?.next?.value).toBe("value3");
  });
});
