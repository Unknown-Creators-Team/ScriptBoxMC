import * as Minecraft from "@minecraft/server";
const { world, system } = Minecraft;
system.afterEvents.scriptEventReceive.subscribe((ev) => {
    const { id, message, sourceType, initiator, sourceBlock, sourceEntity } = ev;
    switch (id) {
        case "test:isEntity": {
            world.sendMessage(`test:isEntity -> ${sourceEntity?.isEntity}`);
            break;
        }
        case "test:isPlayer": {
            world.sendMessage(`test:isPlayer -> ${sourceEntity?.isPlayer}`);
            break;
        }
    }
});
//# sourceMappingURL=instance.js.map