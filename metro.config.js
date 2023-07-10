const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push("cjs");
defaultConfig.transformer.minifierPath = 'metro-minify-uglify';

module.exports = defaultConfig;
