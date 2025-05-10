// TypeScript の場合は以下:
import { getDaysInMonthIf, getDaysInMonthSwitch } from "./index.ts";

describe("if文バージョン", () => {
  it("31日の月の場合、trueが返ってくる", () => {
    const str = "Oct";
    expect(getDaysInMonthIf(str)).toBe(true);
  });

  it("31日未満の月の場合、falseが返ってくる", () => {
    const str = "Apr";
    expect(getDaysInMonthIf(str)).toBe(false);
  });
});

describe("Switchバージョン", () => {
  it("31日の月の場合、trueが返ってくる", () => {
    const str = "Oct";
    expect(getDaysInMonthSwitch(str)).toBe(true);
  });

  it("31日未満の月の場合、falseが返ってくる", () => {
    const str = "Apr";
    expect(getDaysInMonthSwitch(str)).toBe(false);
  });
});
