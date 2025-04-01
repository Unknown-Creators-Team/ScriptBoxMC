import { Player, RawMessage } from "@minecraft/server";
import { FormCancelationReason, MessageFormResponse } from "@minecraft/server-ui";
export declare class MessageFormBox {
    /** @private */ private form;
    /** @private */ private upperCallback;
    /** @private */ private lowerCallback;
    /** @private */ private cancelCallback;
    constructor(title?: RawMessage | string);
    title(titleText: RawMessage | string): MessageFormBox;
    body(bodyText: RawMessage | string): MessageFormBox;
    upperButton(text: RawMessage | string, callback: (player: Player) => void): MessageFormBox;
    lowerButton(text: RawMessage | string, callback: (player: Player) => void): MessageFormBox;
    cancel(callback: (player: Player, cancelationReason?: FormCancelationReason) => void): MessageFormBox;
    show(player: Player): Promise<MessageFormResponse>;
}
