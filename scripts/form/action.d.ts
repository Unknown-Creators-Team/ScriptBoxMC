import { Player, RawMessage } from "@minecraft/server";
import { ActionFormResponse, FormCancelationReason } from "@minecraft/server-ui";
export declare class ActionFormBox {
    /** @private */ private form;
    /** @private */ private callbacks;
    /** @private */ private backCallback;
    /** @private */ private cancelledCallback;
    constructor(title?: string);
    title(titleText: RawMessage | string): ActionFormBox;
    body(bodyText: RawMessage | string): ActionFormBox;
    button(text: RawMessage | string, iconPath?: string, callback?: () => void): ActionFormBox;
    back(callback: (player: Player) => void): ActionFormBox;
    cancel(callback: (cancelationReason?: FormCancelationReason) => void): ActionFormBox;
    show(player: Player): Promise<ActionFormResponse>;
}
