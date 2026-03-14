import { Player, RawMessage } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, FormCancelationReason } from "@minecraft/server-ui";

type ActionElementCallback = (player: Player, index: number) => void;

interface ActionFormConfig {
    back: {
        text: RawMessage | string;
        iconPath?: string;
    };
    close: {
        enabled: boolean;
        text: RawMessage | string;
        iconPath?: string;
    };
}

export class ActionFormBox {
    private form: ActionFormData;
    private callbacks: ActionElementCallback[] = [];
    private backCallback?: ActionElementCallback;
    private cancelledCallback?: (cancelationReason?: FormCancelationReason) => void;
    public static config: ActionFormConfig = {
        back: {
            text: "Back",
            iconPath: "textures/ui/arrowLeft.png",
        },
        close: {
            enabled: true,
            text: "Close",
            iconPath: "textures/ui/redX1.png",
        },
    };

    constructor(title?: string) {
        this.form = new ActionFormData();
        if (title) this.form.title(title);
    }

    public title(text: RawMessage | string): ActionFormBox {
        this.form.title(text);
        return this;
    }

    public body(text: RawMessage | string): ActionFormBox {
        this.form.body(text);
        return this;
    }

    public button(text: RawMessage | string, callback?: ActionElementCallback): ActionFormBox;
    public button(text: RawMessage | string, iconPath: string, callback?: ActionElementCallback): ActionFormBox;
    public button(text: RawMessage | string, value1?: string | ActionElementCallback, value2?: ActionElementCallback): ActionFormBox {
        let iconPath: string | undefined;
        let callback: ActionElementCallback | undefined;
        if (typeof value1 === "string") {
            [iconPath, callback] = [value1, value2];
        } else {
            callback = value1;
        }

        this.form.button(text, iconPath);
        if (callback) this.callbacks.push(callback);
        return this;
    }

    public back(callback: ActionElementCallback): ActionFormBox {
        this.backCallback = callback;
        return this;
    }

    public cancel(callback: (cancelationReason?: FormCancelationReason) => void): ActionFormBox {
        this.cancelledCallback = callback;
        return this;
    }

    public label(text: RawMessage | string): ActionFormBox {
        this.form.label(text);
        return this;
    }

    public divider(): ActionFormBox {
        this.form.divider();
        return this;
    }

    public async show(player: Player): Promise<ActionFormResponse> {
        if (this.backCallback) {
            this.form.button(ActionFormBox.config.back.text, ActionFormBox.config.back.iconPath);
        }
        if (ActionFormBox.config.close.enabled) {
            this.form.button(ActionFormBox.config.close.text, ActionFormBox.config.close.iconPath);
        }

        const response = await this.form.show(player);

        if (response.canceled) {
            if (this.cancelledCallback) this.cancelledCallback(response.cancelationReason);
            return response;
        }

        if (response.selection === undefined) throw new Error("response.selection is undefined");

        if (response.selection === this.callbacks.length) {
            if (this.backCallback) this.backCallback(player, response.selection);
            return response;
        }

        const callback = this.callbacks[response.selection];
        if (callback) callback(player, response.selection);
        return response;
    }
}
