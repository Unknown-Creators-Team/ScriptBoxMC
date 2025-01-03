import { Player, RawMessage } from "@minecraft/server";
import { FormCancelationReason, ModalFormData, ModalFormResponse } from "@minecraft/server-ui";

export class ModalFormBox {
    private form = new ModalFormData();
    private bodyText: string | undefined;
    private canSetBody = true;
    private callbacks: ((player: Player, response: any) => void)[] = [];
    private cancelCallback: ((player: Player, reason?: FormCancelationReason) => void) = () => {};

    public body(bodyText: string): ModalFormBox {
        if (!this.canSetBody) throw new Error("Cannot set body after adding elements");
        this.bodyText = bodyText;
        return this;
    }

    public cancel(callback: (player: Player, reason?: FormCancelationReason) => void): ModalFormBox {
        this.cancelCallback = callback;
        return this;
    }

    public dropdown(
        label: RawMessage | string,
        options: (RawMessage | string)[],
        defaultValueIndex?: number,
        callback?: (player: Player, response: string) => void
    ): ModalFormBox {
        this.form.dropdown(this.formatLabel(label), options, defaultValueIndex);
        if (callback) this.callbacks.push(callback);
        return this;
    }

    public async show(player: Player): Promise<ModalFormResponse> {
        const response = await this.form.show(player);
        if (response.canceled) {
            if (this.cancelCallback) this.cancelCallback(player, response.cancelationReason);
            return response;
        }
        for (const i in this.callbacks) if (response.formValues) this.callbacks[i](player, response.formValues[i]);
        return response;
    }

    public slider(
        label: RawMessage | string,
        minimumValue: number,
        maximumValue: number,
        valueStep: number,
        defaultValue?: number,
        callback?: (player: Player, response: number) => void
    ): ModalFormBox {
        this.form.slider(this.formatLabel(label), minimumValue, maximumValue, valueStep, defaultValue);
        if (callback) this.callbacks.push(callback);
        return this;
    }

    public submitButton(submitButtonText: RawMessage | string): ModalFormBox {
        this.form.submitButton(submitButtonText);
        return this;
    }

    public textField(
        label: RawMessage | string,
        placeholder?: RawMessage | string,
        defaultValue?: string,
        callback?: (player: Player, response: string) => void
    ): ModalFormBox {
        this.form.textField(this.formatLabel(label), placeholder ?? "", defaultValue);
        if (callback) this.callbacks.push(callback);
        return this;
    }

    public title(titleText: RawMessage | string): ModalFormBox {
        this.form.title(titleText);
        return this;
    }

    public toggle(
        label: RawMessage | string,
        defaultValue?: boolean,
        callback?: (player: Player, response: boolean) => void
    ): ModalFormBox {
        this.form.toggle(this.formatLabel(label), defaultValue);
        if (callback) this.callbacks.push(callback);
        return this;
    }

    private formatLabel(label: RawMessage | string): RawMessage | string {
        if (!this.canSetBody) return label;
        this.canSetBody = false;
        if (!this.bodyText) return label;
        if (typeof label === "string") {
            return `${this.bodyText}\n\n§r${label}`;
        }
        if (typeof label === "object") {
            label = { text: `${this.bodyText}\n\n§r`, ...label };
            return label;
        }
        throw new Error("Invalid label type");
    }
}
