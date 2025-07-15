// 目覚まし時計の状態
export type State = "normal" | "alarmSet" | "alarmSounding" | "snoozing";

// イベント時に発生するアクション
export type Action = "none" | "soundAlarm" | "stopAlarm";

/**
 *  単一責任の原則を満たさない
 */
// アラームの状態遷移ロジックと、ログ出力を同じクラスで行う
class AlarmServiceN {
    #state: State; // private な属性

    constructor() {
        this.#state = "normal";
    }

    // アラーム設定イベント
    setAlarm(): Action {
        switch (this.#state) {
            case "normal":
                this.#state = "alarmSet";
                return "none";
            default:
                return "none";
        }
    }

    // アラーム解除イベント
    cancelAlarm(): Action {
        switch (this.#state) {
            case "alarmSet":
                this.#state = "normal";
                return "none";
            case "alarmSounding":
                this.#state = "normal";
                return "stopAlarm";
            case "snoozing":
                this.#state = "normal";
                return "none";
            default:
                return "none";
        }
    }

    // ログの出力
    log(message: string): void {
        console.log(`[LOG]: ${message}`);
    }
}


/**
 *  単一責任の原則を満たす
 */
// アラームの状態遷移ロジックと、ログ出力を別で行う

// ログ出力クラス（クラスにしなくてもよい。）
class Logger {
    log(message: string): void {
        console.log(message);
    }
}

// アラーム状態管理クラス
class AlarmServiceOk {
    #state: State; // private な属性

    constructor() {
        this.#state = "normal";
    }

    // アラーム設定イベント
    setAlarm(): Action {
        switch (this.#state) {
            case "normal":
                this.#state = "alarmSet";
                return "none";
            default:
                return "none";
        }
    }

    // アラーム解除イベント
    cancelAlarm(): Action {
        switch (this.#state) {
            case "alarmSet":
                this.#state = "normal";
                return "none";
            case "alarmSounding":
                this.#state = "normal";
                return "stopAlarm";
            case "snoozing":
                this.#state = "normal";
                return "none";
            default:
                return "none";
        }
    }
}
