const path = require('path');
module.exports = {
  dependencies: {
    '@expocraft/rnuilib': {
      root: path.join(
        __dirname,
        './node_modules/@loudhub-ux/react-native-ui-lib/lib'
      ),
    },
  },
};
