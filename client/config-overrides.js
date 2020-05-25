const path = require("path");

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      components: path.resolve(__dirname, "src", "components"),
      api: path.resolve(__dirname, "src", "api"),
    },
  };
  return config;
};
