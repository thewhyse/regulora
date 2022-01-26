/* eslint-disable */

/*
const cssnanoConfig = {
  preset: ['default', { discardComments: { removeAll: true } }]
};

module.exports = ({ file, options }) => {
  return {
    parser: options.enabled.optimize ? 'postcss-safe-parser' : undefined,
    plugins: {
      autoprefixer: true,
      cssnano: options.enabled.optimize ? cssnanoConfig : false,
    },
  };
};
*/

module.exports = {
  plugins:
    process.env.NODE_ENV === 'production'
      ? [
        'postcss-flexbugs-fixes',
        [
          'postcss-preset-env',
          {
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
            features: {
              'custom-properties': false,
            },
          },
        ],
      ]
      : [
        // No transformations in development
      ],
}