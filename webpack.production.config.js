var config = require('./webpack.config.js');
var BundleTracker = require('webpack-bundle-tracker');
var path = require('path');

config.output.path = path.resolve('./assets/dist/');

config.plugins = [
  new BundleTracker({filename: './webpack-stats-prod.json'})
];

module.exports = config;
