import { RGBA } from "@minecraft/server";

export class Color {
    public static readonly ESCAPE = "§";

    public static readonly BLACK = new Color("0", { red: 0, green: 0, blue: 0, alpha: 1 });
    public static readonly DARK_BLUE = new Color("1", { red: 0, green: 0, blue: 0.667, alpha: 1 });
    public static readonly DARK_GREEN = new Color("2", { red: 0, green: 0.667, blue: 0, alpha: 1 });
    public static readonly DARK_AQUA = new Color("3", { red: 0, green: 0.667, blue: 0.667, alpha: 1 })
    public static readonly DARK_RED = new Color("4", { red: 0.667, green: 0, blue: 0, alpha: 1 });
    public static readonly DARK_PURPLE = new Color("5", { red: 0.667, green: 0, blue: 0.667, alpha: 1 })
    public static readonly GOLD = new Color("6", { red: 1, green: 0.667, blue: 0, alpha: 1 });
    public static readonly GRAY = new Color("7", { red: 0.776, green: 0.776, blue: 0.776, alpha: 1 });
    public static readonly DARK_GRAY = new Color("8", { red: 0.333, green: 0.333, blue: 0.333, alpha: 1 });
    public static readonly BLUE = new Color("9", { red: 0.333, green: 0.333, blue: 1, alpha: 1 });
    public static readonly GREEN = new Color("a", { red: 0.333, green: 1, blue: 0.333, alpha: 1 })
    public static readonly AQUA = new Color("b", { red: 0.333, green: 1, blue: 1, alpha: 1 });
    public static readonly RED = new Color("c", { red: 1, green: 0.333, blue: 0.333, alpha: 1 })
    public static readonly LIGHT_PURPLE = new Color("d", { red: 1, green: 0.333, blue: 1, alpha: 1 });
    public static readonly YELLOW = new Color("e", { red: 1, green: 1, blue: 0.333, alpha: 1 });
    public static readonly WHITE = new Color("f", { red: 1, green: 1, blue: 1, alpha: 1 });

    public static readonly MATERIAL_QUARTZ = new Color("q", { red: 0.89, green: 0.831, blue: 0.82, alpha: 1 });
    public static readonly MATERIAL_IRON = new Color("i", { red: 0.808, green: 0.792, blue: 0.792, alpha: 1 })
    public static readonly MATERIAL_NETHERITE = new Color("j", { red: 0.267, green: 0.227, blue: 0.231, alpha: 1 })
    public static readonly MATERIAL_REDSTONE = new Color("m", { red: 0.592, green: 0.086, blue: 0.027, alpha: 1 })
    public static readonly MATERIAL_COPPER = new Color("n", { red: 0.706, green: 0.408, blue: 0.302, alpha: 1 })
    public static readonly MATERIAL_GOLD = new Color("p", { red: 0.871, green: 0.694, blue: 0.176, alpha: 1 });
    public static readonly MATERIAL_EMERALD = new Color("q", { red: 0.067, green: 0.627, blue: 0.212, alpha: 1 });
    public static readonly MATERIAL_DIAMOND = new Color("s", { red: 0.173, green: 0.729, blue: 0.659, alpha: 1 });
    public static readonly MATERIAL_LAPIS = new Color("t", { red: 0.129, green: 0.286, blue: 0.482, alpha: 1 });
    public static readonly MATERIAL_AMETHYST = new Color("u", { red: 0.604, green: 0.361, blue: 0.776, alpha: 1 });
    public static readonly MATERIAL_RESIN = new Color("v", { red: 0.92, green: 0.447, blue: 0.078, alpha: 1 });

    constructor(
        public readonly code: `${string}`,
        public readonly rgba: RGBA
    ) { }

    toString() {
        return `${Color.ESCAPE}${this.code}`;
    }
}