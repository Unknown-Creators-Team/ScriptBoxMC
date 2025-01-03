import { Player } from "@minecraft/server";
import { MessageFormBox } from "form/message.js";
import { ScriptEvent } from "test/handler.js";

function showExampleMessageForm(player: Player) {
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
}

new ScriptEvent.Handler("message").onReceive((player) => {
    showExampleMessageForm(player);
});
