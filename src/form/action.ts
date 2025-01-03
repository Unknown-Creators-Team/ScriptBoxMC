import { Player, RawMessage } from "@minecraft/server";
import { ActionFormData, FormCancelationReason, uiManager } from "@minecraft/server-ui";

export class ActionFormBox {
    private form: ActionFormData;
    private callbacks: (() => void)[] = [];
    // private cancelledCallback: ((cancelationReason?: FormCancelationReason) => void) | null = null; NULL だ！！ころせ！！
    private cancelledCallback: ((cancelationReason?: FormCancelationReason) => void) | undefined;

    constructor(title?: string) {
        this.form = new ActionFormData();

        if (title) this.form.title(title);
    }

    title(titleText: RawMessage | string): ActionFormBox {
        this.form.title(titleText);

        return this;
    }

    body(bodyText: RawMessage | string): ActionFormBox {
        this.form.body(bodyText);

        return this;
    }

    button(text: RawMessage | string, iconPath?: string, callback?: () => void): ActionFormBox {
        this.form.button(text, iconPath);

        if (callback) this.callbacks.push(callback);

        return this;
    }

    cancel(callback: (cancelationReason?: FormCancelationReason) => void): ActionFormBox {
        this.cancelledCallback = callback;

        return this;
    }

    async show(player: Player) {
        const response = await this.form.show(player);

        if (response.canceled) {
            if (this.cancelledCallback) this.cancelledCallback(response.cancelationReason);

            return;
        }

        if (response.selection === undefined) return;

        const callback = this.callbacks[response.selection];

        if (callback) callback();
    }
}
