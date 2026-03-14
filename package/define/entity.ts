import { Block, Entity, Player } from "@minecraft/server";

declare module "@minecraft/server" {
    interface Entity {
        isPlayer(): this is Player;
        isEntity(): this is Entity;
        isBlock(): this is Block;
        readonly container?: Container;
        health: number;
    }
}

Object.defineProperties(Entity.prototype, {
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
    container: {
        get: function () {
            const com = (this as Entity).getComponent("minecraft:inventory");
            return com?.container;
        },
        configurable: true,
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
        configurable: true,
    },
});
