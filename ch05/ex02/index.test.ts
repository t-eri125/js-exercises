// TypeScript の場合は以下:
import { escapeStringLiteralIf, escapeStringLiteralSwitch } from "./index.ts";

describe("if文バージョン", () => {
  it("他の文字列があっても、エスケープシーケンスは正しく表示される", () => {
    expect(escapeStringLiteralIf("NUL文字：\0です")).toBe("NUL文字：\\0です");
    expect(escapeStringLiteralIf("バックスペース\bです")).toBe("バックスペース\\bです");
    expect(escapeStringLiteralIf("水平タブ\tです")).toBe("水平タブ\\tです");
    expect(escapeStringLiteralIf("改行\nです")).toBe("改行\\nです");
    expect(escapeStringLiteralIf("垂直タブ\vです")).toBe("垂直タブ\\vです");
    expect(escapeStringLiteralIf("改頁\fです")).toBe("改頁\\fです");
    expect(escapeStringLiteralIf("復帰\rです")).toBe("復帰\\rです");
    expect(escapeStringLiteralIf("二重引用符\"です")).toBe("二重引用符\\\"です");
    expect(escapeStringLiteralIf("アポストロフィ\'です")).toBe("アポストロフィ\\'です");
  });

  it("エスケープシーケンスがない場合はそのまま表示される", () => {
    const str = "エスケープシーケンスはありません";
    const expectStr = "エスケープシーケンスはありません";
    expect(escapeStringLiteralIf(str)).toBe(expectStr);
  });

  it("空文字の場合はそのまま表示される", () => {
    const str = "";
    const expectStr = "";
    expect(escapeStringLiteralIf(str)).toBe(expectStr);
  });

  it("エスケープシーケンスが複数あっても、正しく表示される", () => {
    const str = "\0　\b　\t　\n　\v　\f　\r　\"　\'";
    const expectStr = "\\0　\\b　\\t　\\n　\\v　\\f　\\r　\\\"　\\'";
    expect(escapeStringLiteralIf(str)).toBe(expectStr);
  });
});

describe("Switchバージョン", () => {
  it("他の文字列があっても、エスケープシーケンスは正しく表示される", () => {
    expect(escapeStringLiteralSwitch("NUL文字：\0です")).toBe("NUL文字：\\0です");
    expect(escapeStringLiteralSwitch("バックスペース\bです")).toBe("バックスペース\\bです");
    expect(escapeStringLiteralSwitch("水平タブ\tです")).toBe("水平タブ\\tです");
    expect(escapeStringLiteralSwitch("改行\nです")).toBe("改行\\nです");
    expect(escapeStringLiteralSwitch("垂直タブ\vです")).toBe("垂直タブ\\vです");
    expect(escapeStringLiteralSwitch("改頁\fです")).toBe("改頁\\fです");
    expect(escapeStringLiteralSwitch("復帰\rです")).toBe("復帰\\rです");
    expect(escapeStringLiteralSwitch("二重引用符\"です")).toBe("二重引用符\\\"です");
    expect(escapeStringLiteralSwitch("アポストロフィ\'です")).toBe("アポストロフィ\\'です");
  });

  it("エスケープシーケンスがない場合はそのまま表示される", () => {
    const str = "エスケープシーケンスはありません";
    const expectStr = "エスケープシーケンスはありません";
    expect(escapeStringLiteralSwitch(str)).toBe(expectStr);
  });

  it("空文字の場合はそのまま表示される", () => {
    const str = "";
    const expectStr = "";
    expect(escapeStringLiteralSwitch(str)).toBe(expectStr);
  });

  it("エスケープシーケンスが複数あっても、正しく表示される", () => {
    const str = "\0　\b　\t　\n　\v　\f　\r　\"　\'";
    const expectStr = "\\0　\\b　\\t　\\n　\\v　\\f　\\r　\\\"　\\'";
    expect(escapeStringLiteralSwitch(str)).toBe(expectStr);
  });
});
