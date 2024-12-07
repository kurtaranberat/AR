const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.assetExts.push('glb', 'gltf', 'mtl', 'obj', 'png', 'jpg');
defaultConfig.resolver.sourceExts.push('js', 'jsx', 'json', 'ts', 'tsx');

module.exports = defaultConfig;
