const path = require('path');
const WebpackObfuscator = require('webpack-obfuscator');

const base = {
  mode: 'production',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          path.resolve(__dirname, 'src/setupTests.js'),
          path.resolve(__dirname, 'src/__tests__'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
      },
    ],
  },
};

const cjsConfig = Object.assign({}, base, {
  optimization: {
    minimize: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'metis.cjs.min.js',
    library: {
      type: 'commonjs2',
    },
  },
  plugins: [
    new WebpackObfuscator(
      {
        rotateStringArray: true,
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.75,
      },
      []
    ),
  ],
});

const esmConfig = Object.assign({}, base, {
  experiments: {
    outputModule: true,
  },
  optimization: {
    minimize: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'metis.esm.min.mjs',
    module: true,
    library: {
      type: 'module',
    },
  },
  plugins: [
    new WebpackObfuscator(
      {
        rotateStringArray: true,
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.75,
      },
      []
    ),
  ],
});

module.exports = [cjsConfig, esmConfig];
