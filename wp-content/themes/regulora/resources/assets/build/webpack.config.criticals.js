'use strict'; // eslint-disable-line

const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');

const config = require('./config');

module.exports = {
  plugins: [
    ...config.criticals.map(page => {
      return new HtmlCriticalWebpackPlugin({
        base: config.paths.dist,
        src: config.devUrl + page.src + '?no-async=true',
        dest: 'styles/criticals/' + page.key + '.css',
        //ignore: ['@font-face', /url\(/],
        inline: false,
        minify: true,
        extract: false,
        strict: true,
        dimensions: [
          {
            width: 414,
            height: 736,
          },
          {
            width: 992,
            height: 800,
          },
          {
            width: 1360,
            height: 1080,
          },
          {
            width: 1920,
            height: 1080,
          },
        ],
        penthouse: {
          blockJSRequests: false,
          timeout: 900000,
        },
      })
    }),
  ],
};
