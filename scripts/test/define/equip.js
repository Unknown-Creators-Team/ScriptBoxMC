import { system } from "@minecraft/server";
system.afterEvents.scriptEventReceive.subscribe(({ message, sourceEntity: player }) => {
    if (!player?.isPlayer())
        throw new Error("sourceEntity is not a player");
    if (message === "head") {
        player.sendMessage(player.equip.getHead()?.typeId ?? "undefined");
    }
    else if (message === "chest") {
        player.sendMessage(player.equip.getChest()?.typeId ?? "undefined");
    }
    else if (message === "legs") {
        player.sendMessage(player.equip.getLegs()?.typeId ?? "undefined");
    }
    else if (message === "feet") {
        player.sendMessage(player.equip.getFeet()?.typeId ?? "undefined");
    }
    else if (message === "mainhand") {
        player.sendMessage(player.equip.getMainHand()?.typeId ?? "undefined");
    }
    else if (message === "offhand") {
        player.sendMessage(player.equip.getOffHand()?.typeId ?? "undefined");
    }
});
//# sourceMappingURL=equip.js.map