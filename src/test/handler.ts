import { Player, system } from "@minecraft/server";

export namespace ScriptEvent {
    export class Handler {
        private id: string;
        constructor(id: string) {
            this.id = id;
            return this;
        }

        public onReceive(callback: ScriptEventCallback) {
            system.afterEvents.scriptEventReceive.subscribe((ev) => {
                const { id, message, sourceEntity } = ev;
                if (sourceEntity?.isPlayer() && id === `box:${this.id}`) {
                    callback(sourceEntity, message);
                }
            }, { namespaces: ["box"] });
        }
    }

    type ScriptEventCallback = (player: Player, message: string) => void;
}
