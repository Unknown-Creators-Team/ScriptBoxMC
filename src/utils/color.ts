export namespace ColorUtils {
    export const ESCAPE = "§";
    export const MATCH_REGEXP = new RegExp(ESCAPE + "[0-9a-fk-or]", "g");

    export function clean(text: string): string {
        return text.replace(MATCH_REGEXP, "");
    }

    export function includesColor(text: string): boolean {
        return MATCH_REGEXP.test(text);
    }
}
