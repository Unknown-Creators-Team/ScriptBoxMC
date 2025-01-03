import { MessageFormData } from "@minecraft/server-ui";
export class MessageFormBox {
    form = new MessageFormData();
    upperCallback = null;
    lowerCallback = null;
    cancelled = null;
    constructor(title) {
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
    upperButton(text, callback) {
        this.form.button2(text);
        this.upperCallback = callback;
        return this;
    }
    lowerButton(text, callback) {
        this.form.button1(text);
        this.lowerCallback = callback;
        return this;
    }
    cancel(callback) {
        this.cancelled = callback;
        return this;
    }
    async show(player) {
        const response = await this.form.show(player);
        if (response.canceled) {
            if (this.cancelled)
                this.cancelled(player, response.cancelationReason);
            return;
        }
        if (response.selection === 1) {
            if (this.upperCallback)
                this.upperCallback(player);
        }
        else if (response.selection === 0) {
            if (this.lowerCallback)
                this.lowerCallback(player);
        }
    }
}
//# sourceMappingURL=messageFormBox.js.map