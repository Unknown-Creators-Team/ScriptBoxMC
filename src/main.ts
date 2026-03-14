import { system, world } from "@minecraft/server";
import { chalk } from "mc-chalk";
import { ActionFormBox, MessageFormBox, ModalFormBox, ScoreboardUtils } from "ScriptBoxMC";

world.afterEvents.worldLoad.subscribe(() => {});

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const time = ScoreboardUtils.getScore(player, "time") ?? 0;
        ScoreboardUtils.setScore(player, "time", time + 1);
    }
});

world.afterEvents.chatSend.subscribe(async (event) => {
    const { sender: player, message } = event;

    if (message === "action") {
        await system.waitTicks(20);
        new ActionFormBox()
            .title("Test Action Form")
            .button("Option 1", () => {
                player.sendMessage("You chose option 1!");
            })
            .button("Option 2", () => {
                player.sendMessage("You chose option 2!");
            })
            .show(player);
    } else if (message === "modal") {
        await system.waitTicks(20); // Wait for 1 second before showing the form
        new ModalFormBox()
            .title("Test Modal Form")
            .textField({
                label: "Input something:",
                placeholder: "Type here...",
                callback: ({ response: res }) => {
                    player.sendMessage(`You entered: ${res}`);
                },
            })
            .toggle({
                label: "Toggle this",
                callback: ({ response: res }) => {
                    player.sendMessage(`Toggle is now: ${res ? "ON" : "OFF"}`);
                },
            })
            .slider({
                label: "Choose a number:",
                minimumValue: 0,
                maximumValue: 10,
                valueStep: 1,
                callback: ({ response: res }) => {
                    player.sendMessage(`You chose: ${res}`);
                },
            })
            .dropdown({
                label: "Choose an option:",
                options: ["Option 1", "Option 2", "Option 3"],
                callback: ({ response: res }) => {
                    player.sendMessage(`You chose: ${res}`);
                },
            })
            .cancel((player, reason) => {
                player.sendMessage(`Form cancelled: ${reason}`);
            })
            .show(player);
    } else if (message === "message") {
        await system.waitTicks(20);
        new MessageFormBox()
            .title(chalk.red.bold("Test Message Form"))
            .body("This is a test message form.")
            .upperButton("upper", () => {
                player.sendMessage("You clicked the upper button!");
            })
            .lowerButton("lower", () => {
                player.sendMessage("You clicked the lower button!");
            })
            .show(player);
    }
});
