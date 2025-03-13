// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

global.__DEV__ = false;

/* eslint-env node */
if (process.env.NODE_ENV === 'development') {
  const PATH = require('path');
  const blacklist = require('metro-config/src/defaults/exclusionList');
  const extractLinkedPackages = require('./metro-dev-helpers/extract-linked-packages');

  const projectRoot = PATH.resolve(__dirname);

  const { linkedPackages, NodeModules, moduleBlacklist } =
    extractLinkedPackages(projectRoot);

  defaultConfig.resolver = {
    ...defaultConfig.resolver,
    blacklistRE: blacklist(moduleBlacklist),
    extraNodeModules: {
      ...NodeModules,
      ...linkedPackages,
    },
    useWatchman: false,
  };

  defaultConfig.watchFolders = [projectRoot].concat(
    Object.values(linkedPackages)
  );
}

defaultConfig.transformer = {
  ...defaultConfig.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

defaultConfig.resolver = {
  ...defaultConfig.resolver,
  assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
};

defaultConfig.resolver.assetExts.push('cjs');

module.exports = defaultConfig;
