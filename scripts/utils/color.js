export var ColorUtils;
(function (ColorUtils) {
    ColorUtils.ESCAPE = "§";
    ColorUtils.MATCH_REGEXP = new RegExp(ColorUtils.ESCAPE + "[0-9a-fk-or]", "g");
    function clean(text) {
        return text.replace(ColorUtils.MATCH_REGEXP, "");
    }
    ColorUtils.clean = clean;
    function includesColor(text) {
        return ColorUtils.MATCH_REGEXP.test(text);
    }
    ColorUtils.includesColor = includesColor;
})(ColorUtils || (ColorUtils = {}));
//# sourceMappingURL=color.js.map