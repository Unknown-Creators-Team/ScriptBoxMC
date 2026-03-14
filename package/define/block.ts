import { Block, Entity, Player } from "@minecraft/server";

declare module "@minecraft/server" {
    interface Block {
        isPlayer(): this is Player;
        isEntity(): this is Entity;
        isBlock(): this is Block;
    }
}

Object.defineProperties(Block.prototype, {
    isPlayer: {
        value: function () {
            return this instanceof Player;
        },
        configurable: true,
    },
    isEntity: {
        value: function () {
            return this instanceof Entity;
        },
        configurable: true,
    },
    isBlock: {
        value: function () {
            return this instanceof Block;
        },
        configurable: true,
    },
});