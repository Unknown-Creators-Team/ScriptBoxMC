import { ActionFormData } from "@minecraft/server-ui";
export class ActionFormBox {
    form;
    callbacks = [];
    cancelledCallback = null;
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
    cancel(callback) {
        this.cancelledCallback = callback;
        return this;
    }
    async show(player) {
        const response = await this.form.show(player);
        if (response.canceled) {
            if (this.cancelledCallback)
                this.cancelledCallback(response.cancelationReason);
            return;
        }
        if (response.selection === undefined)
            return;
        const callback = this.callbacks[response.selection];
        if (callback)
            callback();
    }
}
//# sourceMappingURL=actionFormBox.js.map