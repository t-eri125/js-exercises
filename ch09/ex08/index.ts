/**
 * ts の場合
 */
// 目覚まし時計の状態
export type State = "normal" | "alarmSet" | "alarmSounding" | "snoozing";

// イベント時に発生するアクション
type Action = "none" | "soundAlarm" | "stopAlarm";

// 発生するアクションと次の状態のペア
export type ActionAndNextState = {
    action: Action;
    nextState: State;
};

// アラーム設定イベント
export function setAlarm(state: State): ActionAndNextState {
    switch (state) {
        case "normal":
            return { action: "none", nextState: "alarmSet" };
        default:
            return { action: "none", nextState: state };
    }
}

// アラーム解除イベント
export function cancelAlarm(state: State): ActionAndNextState {
    switch (state) {
        case "alarmSet":
            return { action: "none", nextState: "normal" };
        case "alarmSounding":
            return { action: "stopAlarm", nextState: "normal" };
        case "snoozing":
            return { action: "none", nextState: "normal" };
        default:
            return { action: "none", nextState: state };
    }
}

// アラーム設定時刻到達イベント
export function reachedToAlarmTime(state: State): ActionAndNextState {
    switch (state) {
        case "alarmSet":
            return { action: "soundAlarm", nextState: "alarmSounding" };
        default:
            return { action: "none", nextState: state };
    }
}

// スヌーズイベント
export function snooze(state: State): ActionAndNextState {
    switch (state) {
        case "alarmSounding":
            return { action: "stopAlarm", nextState: "snoozing" };
        default:
            return { action: "none", nextState: state };
    }
}

// スヌーズ設定時間経過イベント
export function elapseSnoozeTime(state: State): ActionAndNextState {
    switch (state) {
        case "snoozing":
            return { action: "soundAlarm", nextState: "alarmSounding" };
        default:
            return { action: "none", nextState: state };
    }
}
