import { Player, RawMessage } from "@minecraft/server";
import { FormCancelationReason, ModalFormData, ModalFormResponse } from "@minecraft/server-ui";

interface DropdownOptions {
    label: RawMessage | string;
    options: (RawMessage | string)[];
    defaultValueIndex?: number;
    tooltip?: RawMessage | string;
    callback?: ModalElementCallback<number>;
}

interface SliderOptions {
    label: RawMessage | string;
    minimumValue: number;
    maximumValue: number;
    valueStep: number;
    defaultValue?: number;
    tooltip?: RawMessage | string;
    callback?: ModalElementCallback<number>;
}

interface TextFieldOptions {
    label: RawMessage | string;
    placeholder?: RawMessage | string;
    defaultValue?: string;
    tooltip?: RawMessage | string;
    callback?: ModalElementCallback<string>;
}

interface ToggleOptions {
    label: RawMessage | string;
    defaultValue?: boolean;
    tooltip?: RawMessage | string;
    callback?: ModalElementCallback<boolean>;
}

type ModalElementCallback<T> = ({
    player,
    response,
    responses,
}: {
    player: Player;
    response: T;
    responses: (string | number | boolean | undefined)[];
}) => void;

export class ModalFormBox {
    private form = new ModalFormData();
    private callbacks: ModalElementCallback<any>[] = [];
    private cancelCallback: ((player: Player, reason?: FormCancelationReason) => void) | undefined;

    public cancel(callback: (player: Player, reason?: FormCancelationReason) => void): ModalFormBox {
        this.cancelCallback = callback;
        return this;
    }

    public divider(): ModalFormBox {
        this.form.divider();
        this.callbacks.push(() => {});
        return this;
    }

    public dropdown({ label, options, defaultValueIndex, tooltip, callback }: DropdownOptions): ModalFormBox {
        this.form.dropdown(label, options, { defaultValueIndex, tooltip });
        this.callbacks.push(callback ?? (() => {}));
        return this;
    }

    public header(text: RawMessage | string): ModalFormBox {
        this.form.header(text);
        this.callbacks.push(() => {});
        return this;
    }

    public label(text: RawMessage | string): ModalFormBox {
        this.form.label(text);
        this.callbacks.push(() => {});
        return this;
    }

    public async show(player: Player): Promise<ModalFormResponse> {
        const response = await this.form.show(player);
        if (response.canceled) {
            if (this.cancelCallback) this.cancelCallback(player, response.cancelationReason);
            return response;
        }
        for (const i in this.callbacks) {
            if (response.formValues?.length) this.callbacks[i]({ player, response: response.formValues[i], responses: response.formValues });
        }
        return response;
    }

    public slider({ label, minimumValue, maximumValue, valueStep, defaultValue, tooltip, callback }: SliderOptions): ModalFormBox {
        this.form.slider(label, minimumValue, maximumValue, { valueStep, defaultValue, tooltip });
        this.callbacks.push(callback ?? (() => {}));
        return this;
    }

    public submitButton(submitButtonText: RawMessage | string): ModalFormBox {
        this.form.submitButton(submitButtonText);
        return this;
    }

    public textField({ label, placeholder, defaultValue, tooltip, callback }: TextFieldOptions): ModalFormBox {
        this.form.textField(label, placeholder ?? "", { defaultValue, tooltip });
        this.callbacks.push(callback ?? (() => {}));
        return this;
    }

    public title(text: RawMessage | string): ModalFormBox {
        this.form.title(text);
        return this;
    }

    public toggle({ label, defaultValue, tooltip, callback }: ToggleOptions): ModalFormBox {
        this.form.toggle(label, { defaultValue, tooltip });
        this.callbacks.push(callback ?? (() => {}));
        return this;
    }
}
