/* eslint-env node */
const PATH = require('path');

const extractExtraNodeModules = require('./extract-extra-node-modules');

const sdkBlacklistedPaths = [
  '/core/node_modules',
  '/react-native-tdclient/node_modules',
  '/react-native-tdjsonclient/node_modules',
  '/react-native-tdx/node_modules',
  '/node_modules',
];

module.exports = function extractLinkedPackages(repoDir) {
  // Map containing linked packages and their real paths
  const linkedPackages = {
    '@expocraft/core': '/Users/bernardgaitho/@cloudhub/@expocraft/core',
    '@cloudhub-ux/graphql':
      '/Users/bernardgaitho/@cloudhub/@cloudhub-ux/cloudhub-ux-graphql',
  };

  const sdkRootPackage = linkedPackages['@expocraft/core'];
  const graphqlRootPackage = linkedPackages['@cloudhub-ux/graphql'];
  const appcorePackage = linkedPackages['@cloudhubke/appcore'];

  if (!sdkRootPackage) {
    throw new Error('@expocraft/core is not linked!');
  }

  const alternateRoots = [sdkRootPackage, appcorePackage, graphqlRootPackage];

  // Blacklisting samples and other packages folders so theyre not taken in consideration
  // The filter operation checks if this helper is being used inside of one of the blacklisted
  // folders and if so, removes it from the blacklist.
  const moduleBlacklist = sdkBlacklistedPaths
    .filter((item) => repoDir.slice(-item.length) !== item)
    .map((item) => new RegExp(sdkRootPackage + item + '/.*'));

  // Recursively extract node_modules for repoDir and linked packages
  const repoNodeModules = PATH.join(repoDir, 'node_modules');
  const NodeModules = extractExtraNodeModules(repoDir, repoNodeModules);

  return {
    alternateRoots,
    NodeModules,
    linkedPackages,
    moduleBlacklist,
  };
};
