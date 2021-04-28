const withPlugins = require("next-compose-plugins");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

const config = {
  devServer: {
    proxy: {
      "/api": "http://localhost:3000"
    }
  }
};

module.exports = withPlugins([[withBundleAnalyzer]], config);
