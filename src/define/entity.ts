import { Block, Entity, Player } from "@minecraft/server";

Object.defineProperties(Entity.prototype, {
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
    container: {
        get: function () {
            const com = (this as Entity).getComponent("minecraft:inventory");
            return com?.container;
        },
    },
    health: {
        set: function(v) {
            const com = (this as Entity).getComponent("minecraft:health");
            com?.setCurrentValue(v);
        },
        get: function () {
            const com = (this as Entity).getComponent("minecraft:health");
            return com?.currentValue;
        },
    },
});
