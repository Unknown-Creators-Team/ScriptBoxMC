import { Block, Entity, Player } from "@minecraft/server";

Object.defineProperties(Block.prototype, {
    isPlayer: {
        value: function () {
            return this instanceof Player;
        },
    },
    isEntity: {
        value: function () {
            return this instanceof Entity;
        },
    },
    isBlock: {
        value: function () {
            return this instanceof Block;
        },
    },
});