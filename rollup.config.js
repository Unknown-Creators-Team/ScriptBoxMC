// rollup.config.js
export default {
    input: "scripts/index.js",
    output: {
        file: "scripts/ScriptBoxMC.js",
        format: "esm",
    },
    // external: [
        // /@minecraft/,
        // /(data|locale)\/.*\.js$/,
        // /(utils|maths)\.js$/,
    // ]
};
