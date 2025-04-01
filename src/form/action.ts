import { Player, RawMessage } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, FormCancelationReason, uiManager } from "@minecraft/server-ui";

export class ActionFormBox {
    /** @private */ private form: ActionFormData;
    /** @private */ private callbacks: (() => void)[] = [];
    // /** @private */ private cancelledCallback: ((cancelationReason?: FormCancelationReason) => void) | null = null; NULL だ！！ころせ！！
    /** @private */ private backCallback: ((player: Player) => void) | undefined;
    /** @private */ private cancelledCallback: ((cancelationReason?: FormCancelationReason) => void) | undefined;

    constructor(title?: string) {
        this.form = new ActionFormData();
        if (title) this.form.title(title);
    }

    public title(titleText: RawMessage | string): ActionFormBox {
        this.form.title(titleText);
        return this;
    }

    public body(bodyText: RawMessage | string): ActionFormBox {
        this.form.body(bodyText);
        return this;
    }

    public button(text: RawMessage | string, iconPath?: string, callback?: () => void): ActionFormBox {
        this.form.button(text, iconPath);
        if (callback) this.callbacks.push(callback);
        return this;
    }

    public back(callback: (player: Player) => void): ActionFormBox {
        this.backCallback = callback;
        return this;
    }

    public cancel(callback: (cancelationReason?: FormCancelationReason) => void): ActionFormBox {
        this.cancelledCallback = callback;
        return this;
    }

    public async show(player: Player): Promise<ActionFormResponse> {
        if (this.backCallback) this.form.button("Back", "textures/ui/arrowLeft.png");
        this.form.button("Close", "textures/ui/redX1.png");

        const response = await this.form.show(player);

        if (response.canceled) {
            if (this.cancelledCallback) this.cancelledCallback(response.cancelationReason);
            return response;
        }

        if (response.selection === undefined) throw new Error("Selection is undefined");

        if (response.selection === this.callbacks.length) {
            if (this.backCallback) this.backCallback(player);
            return response;
        }

        const callback = this.callbacks[response.selection];
        if (callback) callback();
        return response;
    }
}
