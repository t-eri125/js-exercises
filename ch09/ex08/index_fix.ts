/**
 * 状態とアクションを定数オブジェクトとして定義（as const）
 */
export const State = {
    Normal: "normal",
    AlarmSet: "alarmSet",
    AlarmSounding: "alarmSounding",
    Snoozing: "snoozing",
} as const;

export type State = typeof State[keyof typeof State];

export const Action = {
    None: "none",
    SoundAlarm: "soundAlarm",
    StopAlarm: "stopAlarm",
} as const;

export type Action = typeof Action[keyof typeof Action];

/**
 * アクション + 次の状態 をセットで返す型
 */
export type ActionAndNextState = {
    action: Action;
    nextState: State;
};

/**
 * 各イベント関数（純粋関数）
 */

// アラーム設定イベント
export function setAlarm(state: State): ActionAndNextState {
    switch (state) {
        case State.Normal:
            return { action: Action.None, nextState: State.AlarmSet };
        default:
            return { action: Action.None, nextState: state };
    }
}

// アラーム解除イベント
export function cancelAlarm(state: State): ActionAndNextState {
    switch (state) {
        case State.AlarmSet:
            return { action: Action.None, nextState: State.Normal };
        case State.AlarmSounding:
            return { action: Action.StopAlarm, nextState: State.Normal };
        case State.Snoozing:
            return { action: Action.None, nextState: State.Normal };
        default:
            return { action: Action.None, nextState: state };
    }
}

// アラーム設定時刻到達イベント
export function reachedToAlarmTime(state: State): ActionAndNextState {
    switch (state) {
        case State.AlarmSet:
            return { action: Action.SoundAlarm, nextState: State.AlarmSounding };
        default:
            return { action: Action.None, nextState: state };
    }
}

// スヌーズイベント
export function snooze(state: State): ActionAndNextState {
    switch (state) {
        case State.AlarmSounding:
            return { action: Action.StopAlarm, nextState: State.Snoozing };
        default:
            return { action: Action.None, nextState: state };
    }
}

// スヌーズ時間経過イベント
export function elapseSnoozeTime(state: State): ActionAndNextState {
    switch (state) {
        case State.Snoozing:
            return { action: Action.SoundAlarm, nextState: State.AlarmSounding };
        default:
            return { action: Action.None, nextState: state };
    }
}
