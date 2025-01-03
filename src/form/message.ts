import { Player, RawMessage } from "@minecraft/server";
import { FormCancelationReason, MessageFormData } from "@minecraft/server-ui";

export class MessageFormBox {
    private form: MessageFormData = new MessageFormData();
    // private upperCallback: ((player: Player) => void) | null = null;
    // private lowerCallback: ((player: Player) => void) | null = null; // NULL だ！！ころせ！！ (undefined軍)
    // private cancelled: ((player: Player, cancelationReason?: FormCancelationReason) => void) | null = null;
    private upperCallback: ((player: Player) => void) | undefined;
    private lowerCallback: ((player: Player) => void) | undefined;
    private cancelCallback: ((player: Player, cancelationReason?: FormCancelationReason) => void) | undefined;

    constructor(title?: RawMessage | string) {
        if (title) this.form.title(title);
    }

    title(titleText: RawMessage | string): MessageFormBox {
        this.form.title(titleText);

        return this;
    }

    body(bodyText: RawMessage | string): MessageFormBox {
        this.form.body(bodyText);

        return this;
    }

    upperButton(text: RawMessage | string, callback: (player: Player) => void): MessageFormBox {
        this.form.button2(text);
        this.upperCallback = callback;

        return this;
    }

    lowerButton(text: RawMessage | string, callback: (player: Player) => void): MessageFormBox {
        this.form.button1(text);
        this.lowerCallback = callback;

        return this;
    }

    cancel(callback: (player: Player, cancelationReason?: FormCancelationReason) => void): MessageFormBox {
        this.cancelCallback = callback;

        return this;
    }

    async show(player: Player): Promise<void> {
        const response = await this.form.show(player);

        if (response.canceled) {
            if (this.cancelCallback) this.cancelCallback(player, response.cancelationReason);

            return;
        }

        if (response.selection === 1) {
            if (this.upperCallback) this.upperCallback(player);
        } else if (response.selection === 0) {
            if (this.lowerCallback) this.lowerCallback(player);
        }
    }
}
