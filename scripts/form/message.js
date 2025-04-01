import { MessageFormData } from "@minecraft/server-ui";
export class MessageFormBox {
    /** @private */ form = new MessageFormData();
    // /** @private */ private upperCallback: ((player: Player) => void) | null = null;
    // /** @private */ private lowerCallback: ((player: Player) => void) | null = null; // NULL だ！！ころせ！！ (undefined軍)
    // /** @private */ private cancelled: ((player: Player, cancelationReason?: FormCancelationReason) => void) | null = null;
    /** @private */ upperCallback;
    /** @private */ lowerCallback;
    /** @private */ cancelCallback;
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
            return response;
        }
        if (response.selection === 1) {
            if (this.upperCallback)
                this.upperCallback(player);
        }
        else if (response.selection === 0) {
            if (this.lowerCallback)
                this.lowerCallback(player);
        }
        return response;
    }
}
//# sourceMappingURL=message.js.map