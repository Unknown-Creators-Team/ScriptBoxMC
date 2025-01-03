import { MessageFormData } from "@minecraft/server-ui";
export class MessageFormBox {
    form = new MessageFormData();
    upperCallback;
    lowerCallback;
    cancelCallback;
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
        this.cancelCallback = callback;
        return this;
    }
    async show(player) {
        const response = await this.form.show(player);
        if (response.canceled) {
            if (this.cancelCallback)
                this.cancelCallback(player, response.cancelationReason);
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
//# sourceMappingURL=message.js.map