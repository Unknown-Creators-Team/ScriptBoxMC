import * as Minecraft from "@minecraft/server";
const { world, system } = Minecraft;
system.afterEvents.scriptEventReceive.subscribe((ev) => {
    const { id, message, sourceType, initiator, sourceBlock, sourceEntity } = ev;
    switch (id) {
        case "test:joinedAt": {
            if (!sourceEntity?.isPlayer())
                return;
            const joinedAt = sourceEntity.joinedAt;
            if (joinedAt === undefined) {
                sourceEntity.sendMessage("joinedAt is undefined");
                return;
            }
            sourceEntity.sendMessage(`${joinedAt} ${new Date(joinedAt)}`);
            break;
        }
    }
});
//# sourceMappingURL=joinedAt.js.map