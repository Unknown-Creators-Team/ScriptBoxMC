import { Player, RawMessage } from "@minecraft/server";
import { FormCancelationReason, ModalFormResponse } from "@minecraft/server-ui";
export declare class ModalFormBox {
    /** @private */ private form;
    /** @private */ private bodyText;
    /** @private */ private canSetBody;
    /** @private */ private callbacks;
    /** @private */ private cancelCallback;
    body(bodyText: string): ModalFormBox;
    cancel(callback: (player: Player, reason?: FormCancelationReason) => void): ModalFormBox;
    divider(): ModalFormBox;
    dropdown(label: RawMessage | string, options: (RawMessage | string)[], defaultValueIndex?: number, callback?: (player: Player, response: string) => void): ModalFormBox;
    header(headerText: RawMessage | string): ModalFormBox;
    label(labelText: RawMessage | string): ModalFormBox;
    show(player: Player): Promise<ModalFormResponse>;
    slider(label: RawMessage | string, minimumValue: number, maximumValue: number, valueStep: number, defaultValue?: number, callback?: (player: Player, response: number) => void): ModalFormBox;
    submitButton(submitButtonText: RawMessage | string): ModalFormBox;
    textField(label: RawMessage | string, placeholder?: RawMessage | string, defaultValue?: string, callback?: (player: Player, response: string) => void): ModalFormBox;
    title(titleText: RawMessage | string): ModalFormBox;
    toggle(label: RawMessage | string, defaultValue?: boolean, callback?: (player: Player, response: boolean) => void): ModalFormBox;
    /** @private */ private formatLabel;
}
