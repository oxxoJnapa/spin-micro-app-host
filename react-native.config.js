const digitalTheme = require('@digitaltitransversal/tr_superapp_theme/react_native_theme.config');

const NODE_MODULES_PATH = `${__dirname}/`;

module.exports = {
  commands: require('@callstack/repack/commands'),
  dependencies: {
    /** Check the dependencies included on this package in order to not duplicate them */
    ...digitalTheme.dependencies({ node_modules_path: NODE_MODULES_PATH }),
  },
  assets: ['./assets/fonts'],
};
