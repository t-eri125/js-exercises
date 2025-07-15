/**
 * js の場合 
 */
// 目覚まし時計の状態
export const State = Object.freeze({
    NORMAL: Symbol("normal"), // 通常
    ALARM_SET: Symbol("alarmSet"), // アラームセット中
    ALARM_SOUNDING: Symbol("alarmSounding"), // アラーム鳴動中
    SNOOZING: Symbol("snoozing"), // スヌーズ中
});

// イベント時に発生するアクション
export const Action = Object.freeze({
    NONE: Symbol("none"), // 何もしない
    SOUND_ALARM: Symbol("soundAlarm"), // アラームを鳴らす
    STOP_ALARM: Symbol("stopAlarm"), // アラームを止める
});

// 補足:
// JavaScript では 列挙型を上記のように記述するが
// TypeScript では 列挙型を `type Action = "none" | "soundAlarm" | "stopAlarm";` のように代数的データ型を使って記述するのが一般的

// 目覚まし時計クラス
export class AlarmClock {
    #state; // private な属性

    constructor() {
        this.#state = State.NORMAL;
    }

    // アラーム設定イベント
    setAlarm() {
        switch (this.#state) {
            case State.NORMAL:
                this.#state = State.ALARM_SET;
                return Action.NONE;
            default:
                return Action.NONE;
        }
    }

    // アラーム解除イベント
    cancelAlarm() {
        switch (this.#state) {
            case State.ALARM_SET:
                this.#state = State.NORMAL;
                return Action.NONE;
            case State.ALARM_SOUNDING:
                this.#state = State.NORMAL;
                return Action.STOP_ALARM;
            case State.SNOOZING:
                this.#state = State.NORMAL;
                return Action.NONE;
            default:
                return Action.NONE;
        }
    }

    // アラーム設定時刻到達イベント
    reachedToAlarmTime() {
        switch (this.#state) {
            case State.ALARM_SET:
                this.#state = State.ALARM_SOUNDING;
                return Action.SOUND_ALARM;
            default:
                return Action.NONE;
        }
    }

    // スヌーズイベント
    snooze() {
        switch (this.#state) {
            case State.ALARM_SOUNDING:
                this.#state = State.SNOOZING;
                return Action.STOP_ALARM;
            default:
                return Action.NONE;
        }
    }

    // スヌーズ設定時間経過イベント
    elapseSnoozeTime() {
        switch (this.#state) {
            case State.SNOOZING:
                this.#state = State.ALARM_SOUNDING;
                return Action.SOUND_ALARM;
            default:
                return Action.NONE;
        }
    }
}
