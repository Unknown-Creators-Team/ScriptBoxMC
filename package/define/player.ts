import { EquipmentSlot, Player, world } from "@minecraft/server";
import { uiManager } from "@minecraft/server-ui";

declare module "@minecraft/server" {
    interface Player {
        kick(reason?: string): boolean;
        closeAllForms(): void;
        isRiding: boolean;
        joinedAt: number;
        equip: {
            getHead(): ItemStack | undefined;
            getChest(): ItemStack | undefined;
            getLegs(): ItemStack | undefined;
            getFeet(): ItemStack | undefined;
            getMainHand(): ItemStack | undefined;
            getOffHand(): ItemStack | undefined;
        };
    }
}

Object.defineProperties(Player.prototype, {
    kick: {
        value: function (reason?: string) {
            const result = this.runCommand(`kick ${JSON.stringify(this.name)} ${reason ?? ""}`);
            return result.successCount > 0;
        },
        configurable: true,
    },
    closeAllForms: {
        value: function () {
            uiManager.closeAllForms(this);
        },
        configurable: true,
    },
    isRiding: {
        get: function () {
            const com = (this as Player).getComponent("minecraft:riding");
            return com?.entityRidingOn !== undefined;
        },
        configurable: true,
    },
    joinedAt: {
        get: function () {
            return (this as Player).getDynamicProperty("box@joinedAt");
        },
        configurable: true,
    },
    equip: {
        get: function () {
            const com = (this as Player).getComponent("equippable");
            return {
                getHead: () => com?.getEquipment(EquipmentSlot.Head),
                getChest: () => com?.getEquipment(EquipmentSlot.Chest),
                getLegs: () => com?.getEquipment(EquipmentSlot.Legs),
                getFeet: () => com?.getEquipment(EquipmentSlot.Feet),
                getMainHand: () => com?.getEquipment(EquipmentSlot.Mainhand),
                getOffHand: () => com?.getEquipment(EquipmentSlot.Offhand),
            };
        },
        configurable: true,
    },
});

world.afterEvents.playerSpawn.subscribe((ev) => {
    const { player, initialSpawn } = ev;

    if (initialSpawn) {
        player.setDynamicProperty("box@joinedAt", Date.now());
    }
});
