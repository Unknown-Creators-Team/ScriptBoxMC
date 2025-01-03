import { system } from "@minecraft/server";
export var ScriptEvent;
(function (ScriptEvent) {
    class Handler {
        id;
        constructor(id) {
            this.id = id;
            return this;
        }
        onReceive(callback) {
            system.afterEvents.scriptEventReceive.subscribe((ev) => {
                const { id, message, sourceEntity } = ev;
                if (sourceEntity?.isPlayer() && id === `box:${this.id}`) {
                    callback(sourceEntity, message);
                }
            }, { namespaces: ["box"] });
        }
    }
    ScriptEvent.Handler = Handler;
})(ScriptEvent || (ScriptEvent = {}));
//# sourceMappingURL=handler.js.map