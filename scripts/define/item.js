import { EnchantmentTypes, ItemStack } from "@minecraft/server";
Object.defineProperties(ItemStack.prototype, {
    enchantment: {
        get: function () {
            const com = this.getComponent("enchantable");
            const getEnchantmentType = (enchantmentType) => {
                if (typeof enchantmentType === "string") {
                    if (EnchantmentTypes.get(enchantmentType) === undefined)
                        throw new Error(`Invalid enchantment type: ${enchantmentType}`);
                    enchantmentType = EnchantmentTypes.get(enchantmentType);
                }
                return enchantmentType;
            };
            return {
                getEnchant: function (enchantmentType) {
                    return com?.getEnchantment(enchantmentType);
                },
                getAllEnchants: function () {
                    return com?.getEnchantments();
                },
                addEnchant: function (enchantmentType, level) {
                    com?.addEnchantment({ type: getEnchantmentType(enchantmentType), level });
                },
                canAddEnchant: function (enchantmentType, level) {
                    return com?.canAddEnchantment({ type: getEnchantmentType(enchantmentType), level });
                },
                removeEnchant: function (enchantmentType) {
                    com?.removeEnchantment(getEnchantmentType(enchantmentType));
                },
                removeAllEnchants: function () {
                    com?.removeAllEnchantments();
                },
                hasEnchant: function (enchantmentType) {
                    return com?.hasEnchantment(getEnchantmentType(enchantmentType));
                },
            };
        },
    },
});
//# sourceMappingURL=item.js.map