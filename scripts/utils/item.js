import { EnchantmentTypes, ItemLockMode, ItemStack } from "@minecraft/server";
/** @type {ItemStackUtils} */
export var ItemStackUtils;
(function (ItemStackUtils) {
    function toJSON(item) {
        const dynamicProperties = item.getDynamicPropertyIds().map((key) => {
            const value = item.getDynamicProperty(key);
            return [key, value];
        });
        const enchantments = item
            .getComponent("enchantable")
            ?.getEnchantments()
            .map((enchantment) => {
            return {
                level: enchantment.level,
                type: enchantment.type.id,
            };
        });
        return {
            typeId: item.typeId,
            amount: item.amount,
            keepOnDeath: item.keepOnDeath,
            lockMode: item.lockMode,
            nameTag: item.nameTag,
            dynamicProperties: Object.fromEntries(dynamicProperties),
            canDestroy: item.getCanDestroy(),
            canPlaceOn: item.getCanPlaceOn(),
            lore: item.getLore(),
            components: {
                durability: {
                    damage: item.getComponent("durability")?.damage,
                },
                dyeable: {
                    color: item.getComponent("dyeable")?.color,
                },
                enchantable: {
                    enchantments,
                },
            },
        };
    }
    ItemStackUtils.toJSON = toJSON;
    function fromJSON(json) {
        const item = new ItemStack(json.typeId, json.amount);
        item.keepOnDeath = json.keepOnDeath ?? false;
        item.lockMode = json.lockMode ?? ItemLockMode.none;
        item.nameTag = json.nameTag;
        for (const [key, value] of Object.entries(json.dynamicProperties ?? {})) {
            item.setDynamicProperty(key, value);
        }
        item.setCanDestroy(json.canDestroy ?? []);
        item.setCanPlaceOn(json.canPlaceOn ?? []);
        item.setLore(json.lore ?? []);
        if (json.components) {
            if (json.components.durability) {
                const com = item.getComponent("durability");
                if (com)
                    com.damage = json.components.durability.damage ?? 0;
            }
            if (json.components.dyeable) {
                const com = item.getComponent("dyeable");
                if (com)
                    com.color = json.components.dyeable.color ?? com.defaultColor;
            }
            if (json.components.enchantable) {
                const com = item.getComponent("enchantable");
                if (com) {
                    for (const enchantment of json.components.enchantable.enchantments ?? []) {
                        const enchantmentType = EnchantmentTypes.get(enchantment.type);
                        if (!enchantmentType)
                            throw new Error(`Invalid enchantment type: ${enchantment.type}`);
                        com.addEnchantment({ type: enchantmentType, level: enchantment.level });
                    }
                }
            }
        }
        return item;
    }
    ItemStackUtils.fromJSON = fromJSON;
    function minimizeJSON(json) {
        json.components = Object.fromEntries(Object.entries(json.components ?? {}).filter(([key, value]) => {
            if (key === "durability" && "damage" in value && (value.damage === 0 || value.damage === undefined))
                return false;
            if (key === "dyeable" && "color" in value && value.color === undefined)
                return false;
            if (key === "enchantable" && "enchantments" in value && value.enchantments?.length === 0)
                return false;
            return true;
        }));
        json = Object.fromEntries(Object.entries(json).filter(([key, value]) => {
            if (key === "keepOnDeath" && value === false)
                return false;
            if (key === "lockMode" && value === ItemLockMode.none)
                return false;
            if (key === "nameTag" && value === undefined)
                return false;
            if (key === "canDestroy" && value.length === 0)
                return false;
            if (key === "canPlaceOn" && value.length === 0)
                return false;
            if (key === "lore" && value.length === 0)
                return false;
            if (key === "dynamicProperties") {
                return Object.values(value).some((v) => v !== undefined && v !== null);
            }
            if (key === "components") {
                return Object.values(value).some((v) => v !== undefined && v !== null && Object.values(v).filter(Boolean).length > 0);
            }
            return value !== undefined && value !== null;
        }));
        return json;
    }
    ItemStackUtils.minimizeJSON = minimizeJSON;
})(ItemStackUtils || (ItemStackUtils = {}));
//# sourceMappingURL=item.js.map