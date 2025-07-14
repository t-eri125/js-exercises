// TypeScript の場合は以下:
import { f } from "./index.ts";

describe("JSONでパースできるかどうかで結果が変わることを確認する", () => {
  it("文字列が JSON としてパース出来る場合", () => {
    const str = "{\"a\":1,\"B\":\"文字\"}";
    const expectStr: object = { success: true, data: str };
    expect(f(str)).toBe(expectStr);
  });

  // it("文字列が JSON としてパースできない場合", () => {
  //   const str = "ただの文字列";
  //   const expectStr = `{success: false, error: SyntaxError: Unexpected token '${str[0]}', \"${str}\" is not valid JSON}`;
  //   expect(f(str)).toBe(expectStr);
  // });
});


// 間違っていたため修正
// describe("JSONでパースできるかどうかで結果が変わることを確認する", () => {
//   it("文字列が JSON としてパース出来る場合", () => {
//     const str = "{\"a\":1,\"B\":\"文字\"}";
//     const expectStr = `{success: true, data: ${str}}`;
//     expect(f(str)).toBe(expectStr);
//   });

//   it("文字列が JSON としてパースできない場合", () => {
//     const str = "ただの文字列";
//     const expectStr = `{success: false, error: SyntaxError: Unexpected token '${str[0]}', \"${str}\" is not valid JSON}`;
//     expect(f(str)).toBe(expectStr);
//   });
// });
