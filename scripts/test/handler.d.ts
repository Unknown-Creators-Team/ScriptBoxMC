import { Player } from "@minecraft/server";
export declare namespace ScriptEvent {
    export class Handler {
        private id;
        constructor(id: string);
        onReceive(callback: ScriptEventCallback): void;
    }
    type ScriptEventCallback = (player: Player, message: string) => void;
    export {};
}
