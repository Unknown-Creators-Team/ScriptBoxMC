import * as Minecraft from "@minecraft/server";
import { MessageFormBox } from "form/message.js";
const { world } = Minecraft;
world.afterEvents.chatSend.subscribe((ev) => {
    const { sender: player, message } = ev;
    if (message !== "messageform")
        return;
    const messageForm = () => {
        const form = new MessageFormBox("Example Message Form")
            .title("Form Title")
            .body("This is an example of a message form.")
            .upperButton("Yes", (player) => {
            player.sendMessage("You clicked Yes!");
        })
            .lowerButton("No", (player) => {
            player.sendMessage("You clicked No!");
        })
            .cancel((player, cancelationReason) => {
            player.sendMessage(`Form was cancelled. Reason: ${cancelationReason}`);
        });
        form.show(player);
    };
    messageForm();
});
//# sourceMappingURL=messageForm.js.map