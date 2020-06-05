const path = require("path");

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      components: path.resolve(__dirname, "src", "components"),
      api: path.resolve(__dirname, "src", "api"),
      layouts: path.resolve(__dirname, "src", "layouts"),
      containers: path.resolve(__dirname, "src", "containers"),
      models: path.resolve(__dirname, "src", "models"),
      store: path.resolve(__dirname, "src", "store"),
      utils: path.resolve(__dirname, "src", "utils"),
    },
  };
  return config;
};
