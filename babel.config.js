const iconPlugins = require('@expocraft-icons/chub/babel-plugins');
const path = require('path');
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      ...iconPlugins,
      [
        'module-resolver',
        {
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@cloudhubke/app': path.resolve(__dirname, './@cloudhubke/app'),
            '@cloudhubke/labfoxx':
              '/Users/bernardgaitho/@cloudhub/@cloudhubapps/labfoxx/src',
            '@cloudhubke/appcore':
              '/Users/bernardgaitho/@cloudhub/@cloudhubapps/appcore/src',
            '@expocraft/core': '/Users/bernardgaitho/@cloudhub/@expocraft/core',
            '@cloudhub-ux/graphql':
              '/Users/bernardgaitho/@cloudhub/@cloudhub-ux/cloudhub-ux-graphql',
            '@pesapurse/ppapp':
              '/Users/bernardgaitho/@cloudhub/webapps/mypesapurse/pesapurseapp/@ppapp',
          },
        },
      ],
    ],
  };
};
