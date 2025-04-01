export declare namespace ColorUtils {
    const ESCAPE = "\u00A7";
    const MATCH_REGEXP: RegExp;
    function clean(text: string): string;
    function includesColor(text: string): boolean;
}
