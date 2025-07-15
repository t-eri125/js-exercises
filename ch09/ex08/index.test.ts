import {
    setAlarm,
    cancelAlarm,
    reachedToAlarmTime,
    snooze,
    elapseSnoozeTime
} from './index.ts'

// 各状態から別の状態への遷移をすべてテスト
describe("アラーム状態遷移イベントテスト", () => {

    describe("状態: 通常", () => {
        it("アラーム設定：「アラームセット中」に遷移", () => {
            expect(setAlarm("normal")).toEqual({ action: "none", nextState: "alarmSet" });
        });
        it("アラーム解除：遷移なし", () => {
            expect(cancelAlarm("normal")).toEqual({ action: "none", nextState: "normal" });
        });
        it("アラーム設定時刻到達：遷移なし", () => {
            expect(reachedToAlarmTime("normal")).toEqual({ action: "none", nextState: "normal" });
        });
        it("スヌーズ：遷移なし", () => {
            expect(snooze("normal")).toEqual({ action: "none", nextState: "normal" });
        });
        it("スヌーズ設定時間経過：遷移なし", () => {
            expect(elapseSnoozeTime("normal")).toEqual({ action: "none", nextState: "normal" });
        });
    });

    describe("状態: アラームセット中", () => {
        it("アラーム設定：遷移なし", () => {
            expect(setAlarm("alarmSet")).toEqual({ action: "none", nextState: "alarmSet" });
        });
        it("アラーム解除：「通常」に遷移", () => {
            expect(cancelAlarm("alarmSet")).toEqual({ action: "none", nextState: "normal" });
        });
        it("アラーム設定時刻到達：「アラーム鳴動中」に遷移", () => {
            expect(reachedToAlarmTime("alarmSet")).toEqual({ action: "soundAlarm", nextState: "alarmSounding" });
        });
        it("スヌーズ：遷移なし", () => {
            expect(snooze("alarmSet")).toEqual({ action: "none", nextState: "alarmSet" });
        });
        it("スヌーズ設定時間経過：遷移なし", () => {
            expect(elapseSnoozeTime("alarmSet")).toEqual({ action: "none", nextState: "alarmSet" });
        });
    });

    describe("状態: アラーム鳴動中", () => {
        it("アラーム設定：遷移なし", () => {
            expect(setAlarm("alarmSounding")).toEqual({ action: "none", nextState: "alarmSounding" });
        });
        it("アラーム解除：「通常」に遷移", () => {
            expect(cancelAlarm("alarmSounding")).toEqual({ action: "stopAlarm", nextState: "normal" });
        });
        it("アラーム設定時刻到達：遷移なし", () => {
            expect(reachedToAlarmTime("alarmSounding")).toEqual({ action: "none", nextState: "alarmSounding" });
        });
        it("スヌーズ：「スヌーズ中」に遷移", () => {
            expect(snooze("alarmSounding")).toEqual({ action: "stopAlarm", nextState: "snoozing" });
        });
        it("スヌーズ設定時間経過：遷移なし", () => {
            expect(elapseSnoozeTime("alarmSounding")).toEqual({ action: "none", nextState: "alarmSounding" });
        });
    });

    describe("状態: スヌーズ中", () => {
        it("アラーム設定：遷移なし", () => {
            expect(setAlarm("snoozing")).toEqual({ action: "none", nextState: "snoozing" });
        });
        it("アラーム解除：「通常」に遷移", () => {
            expect(cancelAlarm("snoozing")).toEqual({ action: "none", nextState: "normal" });
        });
        it("アラーム設定時刻到達：遷移なし", () => {
            expect(reachedToAlarmTime("snoozing")).toEqual({ action: "none", nextState: "snoozing" });
        });
        it("スヌーズ：遷移なし", () => {
            expect(snooze("snoozing")).toEqual({ action: "none", nextState: "snoozing" });
        });
        it("スヌーズ設定時間経過：「アラーム鳴動中」に遷移", () => {
            expect(elapseSnoozeTime("snoozing")).toEqual({ action: "soundAlarm", nextState: "alarmSounding" });
        });
    });
});
