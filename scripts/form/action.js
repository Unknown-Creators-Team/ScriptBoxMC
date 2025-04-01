import { ActionFormData } from "@minecraft/server-ui";
export class ActionFormBox {
    /** @private */ form;
    /** @private */ callbacks = [];
    // /** @private */ private cancelledCallback: ((cancelationReason?: FormCancelationReason) => void) | null = null; NULL だ！！ころせ！！
    /** @private */ backCallback;
    /** @private */ cancelledCallback;
    constructor(title) {
        this.form = new ActionFormData();
        if (title)
            this.form.title(title);
    }
    title(titleText) {
        this.form.title(titleText);
        return this;
    }
    body(bodyText) {
        this.form.body(bodyText);
        return this;
    }
    button(text, iconPath, callback) {
        this.form.button(text, iconPath);
        if (callback)
            this.callbacks.push(callback);
        return this;
    }
    back(callback) {
        this.backCallback = callback;
        return this;
    }
    cancel(callback) {
        this.cancelledCallback = callback;
        return this;
    }
    async show(player) {
        if (this.backCallback)
            this.form.button("Back", "textures/ui/arrowLeft.png");
        this.form.button("Close", "textures/ui/redX1.png");
        const response = await this.form.show(player);
        if (response.canceled) {
            if (this.cancelledCallback)
                this.cancelledCallback(response.cancelationReason);
            return response;
        }
        if (response.selection === undefined)
            throw new Error("Selection is undefined");
        if (response.selection === this.callbacks.length) {
            if (this.backCallback)
                this.backCallback(player);
            return response;
        }
        const callback = this.callbacks[response.selection];
        if (callback)
            callback();
        return response;
    }
}
//# sourceMappingURL=action.js.map