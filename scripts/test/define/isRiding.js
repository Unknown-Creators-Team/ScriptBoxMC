import { world } from "@minecraft/server";
world.afterEvents.chatSend.subscribe((ev) => {
    const { sender: player, message } = ev;
    if (message === "isRiding") {
        player.sendMessage(`isRiding: ${player.isRiding}`);
    }
});
//# sourceMappingURL=isRiding.js.map