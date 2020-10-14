const path = require('path');

module.exports = {
  webpack(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          app: path.resolve(__dirname, './'),
        },
      },
    };
  },
};