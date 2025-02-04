import { ItemStack } from "@minecraft/server";
import { ScriptEvent } from "./handler.js";
new ScriptEvent.Handler("playground")
    .onReceive((player, message) => {
    const item = new ItemStack("iron_sword", 1);
    // item.setLore(["Assassin I", { translate: }]);
    player.container?.addItem(item);
});
// function event(ev: ChatSendAfterEvent) {
//     const { sender: player, message } = ev;
//     console.warn(`[ChatSendAfterEvent] ${player.name}: ${message}`);
// }
// world.afterEvents.chatSend.subscribe(event);
// world.afterEvents.chatSend.unsubscribe(event);
// world.afterEvents.chatSend.subscribe(event);
// world.afterEvents.chatSend.subscribe(event);
//# sourceMappingURL=playground.js.map