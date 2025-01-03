import * as Minecraft from "@minecraft/server";
import * as MinecraftUI from "@minecraft/server-ui";

declare module "@minecraft/server" {
    interface Player {
        // methods
        readonly kick(reason?: string): boolean;

        // properties
        // /** @deprecated */
        readonly isRiding: boolean;
        readonly joinedAt: number | undefined;
        readonly equip: {
            getHead(): Minecraft.ItemStack | undefined;
            getChest(): Minecraft.ItemStack | undefined;
            getLegs(): Minecraft.ItemStack | undefined;
            getFeet(): Minecraft.ItemStack | undefined;
            getMainHand(): Minecraft.ItemStack | undefined;
            getOffHand(): Minecraft.ItemStack | undefined;
        };
    }

    interface Entity {
        isPlayer(): this is Player;
        isEntity(): this is Entity;
        isBlock(): this is Block;

        // properties
        health: number | undefined;
        readonly container: Minecraft.Container | undefined;
    }

    interface Block {
        isPlayer(): this is Player;
        isEntity(): this is Entity;
        isBlock(): this is Block;
    }

    interface ItemStack {
        enchantment: {
            getEnchant(enchantment: EnchantmentType | string): Enchantment | undefined;
            getAllEnchants(): Enchantment[];
            addEnchant(enchantment: EnchantmentType | string, level: number): void;
            canAddEnchant(enchantment: EnchantmentType | string, level: number): boolean;
            removeEnchant(enchantment: EnchantmentType | string): void;
            removeAllEnchants(): void;
            hasEnchant(enchantment: EnchantmentType | string): boolean;
        }
        // toJSON(): string;
        // static fromJSON(json: string): ItemStack;
        // static fromJSON(json: string): ItemStack;
    }
}


declare module "@minecraft/server-ui" {
    /**
     * @example showBasicActionFormBox.ts
     * ```typescript
     * function showBasicActionFormBox() {
     *     const players = world.getPlayers();
     *
     *     const actionForm = new ActionFormBox("Example Action Form")
     *         .body("This is an example of an action form.")
     *         .button("First Button", "textures/item/diamond", (player) => {
     *             player.sendMessage("First Button was clicked!");
     *         })
     *         .button("Second Button", "textures/item/emerald", (player) => {
     *             player.sendMessage("Second Button was clicked!");
     *         })
     *         .cancel((player, cancelationReason) => {
     *             player.sendMessage(`Action Form was cancelled. Reason: ${cancelationReason}`);
     *         });
     *
     *     for(const player of players) {
     *         actionForm.show(player);
     *     }
     * }
     * ```
     */
    // class ActionFormBox {
    //     constructor(title?: string);

    //     /**
    //      * @remarks
    //      * This builder method sets the title for the modal dialog.
    //      *
    //      */
    //     title(titleText: Minecraft.RawMessage | string): ActionFormBox;

    //     /**
    //      * @remarks
    //      * Method that sets the body text for the modal form.
    //      *
    //      */
    //     body(bodyText: Minecraft.RawMessage | string): ActionFormBox;

    //     /**
    //      * @remarks
    //      * Adds a button to this form with an icon from a resource
    //      * pack.
    //      *
    //      */
    //     button(text: Minecraft.RawMessage | string, iconPath?: string, callback?: () => void): ActionFormBox;

    //     /**
    //      * @remarks
    //      * Set the callback for when the form is cancelled.
    //      */
    //     cancel(callback: (cancelationReason?: FormCancelationReason) => void): ActionFormBox;

    //     /**
    //      * @remarks
    //      * Creates and shows this modal popup form. Returns
    //      * asynchronously when the player confirms or cancels the
    //      * dialog.
    //      *
    //      * This function can't be called in read-only mode.
    //      *
    //      * @param player
    //      * Player to show this dialog to.
    //      * @throws This function can throw errors.
    //      */
    //     show(player: Player): Promise<void>;
    // }

    // /**
    //  * @example showMessageFormBox.ts
    //  * ```typescript
    //  * function showMessageFormBox() {
    //  *     const players = world.getPlayers();
    //  *
    //  *     const messageForm = new MessageFormBox("Example Message Form")
    //  *         .title("Form Title")
    //  *         .body("This is an example of a message form.")
    //  *         .upperButton("Yes", (player) => {
    //  *             player.sendMessage("You clicked Yes!");
    //  *         })
    //  *         .lowerButton("No", (player) => {
    //  *             player.sendMessage("You clicked No!");
    //  *         })
    //  *         .cancel((player, cancelationReason) => {
    //  *             player.sendMessage(`Form was cancelled. Reason: ${cancelationReason}`);
    //  *         });
    //  *
    //  *     for (const player of players) {
    //  *         messageForm.show(player);
    //  *     }
    //  * }
    //  * ```
    //  */
    // class MessageFormBox {
    //     constructor(title?: Minecraft.RawMessage | string);

    //     /**
    //      * @remarks
    //      * This builder method sets the title for the modal dialog.
    //      *
    //      */
    //     title(titleText: Minecraft.RawMessage | string): MessageFormBox;

    //     /**
    //      * @remarks
    //      * Method that sets the body text for the modal form.
    //      *
    //      */
    //     body(bodyText: Minecraft.RawMessage | string): MessageFormBox;

    //     /**
    //      * @remarks
    //      * Method that sets the text for the upper button.
    //      */
    //     upperButton(text: Minecraft.RawMessage | string, callback: (player: Minecraft.Player) => void): MessageFormBox;

    //     /**
    //      * @remarks
    //      * Method that sets the text for the lower button.
    //      */
    //     lowerButton(text: Minecraft.RawMessage | string, callback: (player: Minecraft.Player) => void): MessageFormBox;

    //     /**
    //      * @remarks
    //      * Set the callback for when the form is cancelled.
    //      */
    //     cancel(
    //         callback: (player: Minecraft.Player, cancelationReason?: MinecraftUI.FormCancelationReason) => void
    //     ): MessageFormBox;

    //     /**
    //      * @remarks
    //      * Creates and shows this modal popup form. Returns
    //      * asynchronously when the player confirms or cancels the
    //      * dialog.
    //      *
    //      * This function can't be called in read-only mode.
    //      *
    //      * @param player
    //      * Player to show this dialog to.
    //      * @throws This function can throw errors.
    //      */
    //     show(player: Minecraft.Player): Promise<void>;
    // }

    // /**
    //  * Used to create a fully customizable pop-up form for a
    //  * player.
    //  * @example showBasicModalForm.ts
    //  * ```typescript
    //  * import { world, DimensionLocation } from "@minecraft/server";
    //  * import { ModalFormData } from "@minecraft/server-ui";
    //  *
    //  * function showBasicModalForm(log: (message: string, status?: number) => void, targetLocation: DimensionLocation) {
    //  *   const players = world.getPlayers();
    //  *
    //  *   const modalForm = new ModalFormData().title("Example Modal Controls for §o§7ModalFormData§r");
    //  *
    //  *   modalForm.toggle("Toggle w/o default");
    //  *   modalForm.toggle("Toggle w/ default", true);
    //  *
    //  *   modalForm.slider("Slider w/o default", 0, 50, 5);
    //  *   modalForm.slider("Slider w/ default", 0, 50, 5, 30);
    //  *
    //  *   modalForm.dropdown("Dropdown w/o default", ["option 1", "option 2", "option 3"]);
    //  *   modalForm.dropdown("Dropdown w/ default", ["option 1", "option 2", "option 3"], 2);
    //  *
    //  *   modalForm.textField("Input w/o default", "type text here");
    //  *   modalForm.textField("Input w/ default", "type text here", "this is default");
    //  *
    //  *   modalForm
    //  *     .show(players[0])
    //  *     .then((formData) => {
    //  *       players[0].sendMessage(`Modal form results: ${JSON.stringify(formData.formValues, undefined, 2)}`);
    //  *     })
    //  *     .catch((error: Error) => {
    //  *       log("Failed to show form: " + error);
    //  *       return -1;
    //  *     });
    //  * }
    //  * ```
    //  */
    // class ModalFormBox {
    //     /**
    //      * @remarks
    //      * Method that sets the body text for the modal form.
    //      *
    //      */
    //     body(bodyText: string): ModalFormBox;
    //     /**
    //      * @remarks
    //      * Method that sets the callback for when the form is
    //      * cancelled.
    //      *
    //      */
    //     cancel(callback: (player: Player, reason?: FormCancelationReason) => void): ModalFormBox;
    //     /**
    //      * @remarks
    //      * Adds a dropdown with choices to the form.
    //      *
    //      */
    //     dropdown(
    //         label: RawMessage | string,
    //         options: (RawMessage | string)[],
    //         defaultValueIndex?: number,
    //         callback?: (player: Player, response: string) => void
    //     ): ModalFormBox;
    //     /**
    //      * @remarks
    //      * Creates and shows this modal popup form. Returns
    //      * asynchronously when the player confirms or cancels the
    //      * dialog.
    //      *
    //      * This function can't be called in read-only mode.
    //      *
    //      * @param player
    //      * Player to show this dialog to.
    //      * @throws This function can throw errors.
    //      */
    //     show(player: Player): Promise<ModalFormResponse>;
    //     /**
    //      * @remarks
    //      * Adds a numeric slider to the form.
    //      *
    //      */
    //     slider(
    //         label: RawMessage | string,
    //         minimumValue: number,
    //         maximumValue: number,
    //         valueStep: number,
    //         defaultValue?: number,
    //         callback?: (player: Player, response: number) => void
    //     ): ModalFormBox;
    //     submitButton(submitButtonText: RawMessage | string): ModalFormBox;
    //     /**
    //      * @remarks
    //      * Adds a textbox to the form.
    //      *
    //      */
    //     textField(
    //         label: RawMessage | string,
    //         placeholder?: RawMessage | string,
    //         defaultValue?: string,
    //         callback?: (player: Player, response: string) => void
    //     ): ModalFormBox;
    //     /**
    //      * @remarks
    //      * This builder method sets the title for the modal dialog.
    //      *
    //      */
    //     title(titleText: RawMessage | string): ModalFormBox;
    //     /**
    //      * @remarks
    //      * Adds a toggle checkbox button to the form.
    //      *
    //      */
    //     toggle(
    //         label: RawMessage | string,
    //         defaultValue?: boolean,
    //         callback?: (player: Player, response: boolean) => void
    //     ): ModalFormBox;
    // }
}
