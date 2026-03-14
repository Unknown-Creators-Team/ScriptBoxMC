import { Enchantment, EnchantmentType, EnchantmentTypes, ItemLockMode, ItemStack, PotionEffectType } from "@minecraft/server";

declare module "@minecraft/server" {
    interface ItemStack {
        enchantment: {
            getEnchant(enchantmentType: EnchantmentType | string): Enchantment | undefined;
            getAllEnchants(): Enchantment[] | undefined;
            addEnchant(enchantmentType: EnchantmentType | string, level: number): void;
            canAddEnchant(enchantmentType: EnchantmentType | string, level: number): boolean | undefined;
            removeEnchant(enchantmentType: EnchantmentType | string): void;
            removeAllEnchants(): void;
            hasEnchant: (enchantmentType: EnchantmentType | string) => boolean | undefined;
        };
    }
}

Object.defineProperties(ItemStack.prototype, {
    enchantment: {
        get: function () {
            const com = (this as ItemStack).getComponent("enchantable");
            const getEnchantmentType = (enchantmentType: EnchantmentType | string): EnchantmentType => {
                if (typeof enchantmentType === "string") {
                    if (EnchantmentTypes.get(enchantmentType) === undefined)
                        throw new Error(`Invalid enchantment type: ${enchantmentType}`);
                    enchantmentType = EnchantmentTypes.get(enchantmentType)!;
                }
                return enchantmentType;
            };

            return {
                getEnchant: function (enchantmentType: EnchantmentType | string) {
                    return com?.getEnchantment(enchantmentType);
                },
                getAllEnchants: function () {
                    return com?.getEnchantments();
                },
                addEnchant: function (enchantmentType: EnchantmentType | string, level: number) {
                    com?.addEnchantment({ type: getEnchantmentType(enchantmentType), level });
                },
                canAddEnchant: function (enchantmentType: EnchantmentType | string, level: number) {
                    return com?.canAddEnchantment({ type: getEnchantmentType(enchantmentType), level });
                },
                removeEnchant: function (enchantmentType: EnchantmentType | string) {
                    com?.removeEnchantment(getEnchantmentType(enchantmentType));
                },
                removeAllEnchants: function () {
                    com?.removeAllEnchantments();
                },
                hasEnchant: function (enchantmentType: EnchantmentType | string) {
                    return com?.hasEnchantment(getEnchantmentType(enchantmentType));
                },
            };
        },
        configurable: true,
    },
});