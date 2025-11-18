import { JestConfigWithTsJest } from "ts-jest";

export default {
  preset: "ts-jest/presets/js-with-ts-esm",
  testMatch: ["**/?(*.)+(test|spec).(cjs|[jt]s?(x))"], // spec も含める
} satisfies JestConfigWithTsJest;
