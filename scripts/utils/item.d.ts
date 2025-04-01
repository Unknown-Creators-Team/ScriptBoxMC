import { ItemLockMode, ItemStack, RGB, Vector3 } from "@minecraft/server";
export declare namespace ItemStackUtils {
    export function toJSON(item: ItemStack): ItemStackJSON;
    export function fromJSON(json: ItemStackJSON): ItemStack;
    export function minimizeJSON(json: ItemStackJSON): ItemStackJSON;
    interface ItemStackJSON {
        typeId: string;
        amount: number;
        keepOnDeath?: boolean;
        lockMode?: keyof typeof ItemLockMode;
        nameTag?: string;
        dynamicProperties?: Record<string, boolean | number | string | Vector3 | undefined>;
        canDestroy?: string[];
        canPlaceOn?: string[];
        lore?: string[];
        components?: {
            durability?: {
                damage?: number;
            };
            dyeable?: {
                color?: RGB;
            };
            enchantable?: {
                enchantments?: {
                    level: number;
                    type: string;
                }[];
            };
        };
    }
    export {};
}
