import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import * as FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import * as CircularDependencyPlugin from 'circular-dependency-plugin';
import * as ReactJssHmrPlugin from 'react-jss-hmr/webpack';
import * as FileManagerWebpackPlugin from 'filemanager-webpack-plugin';

import * as threadLoader from 'thread-loader';
import * as postcssSCSS from 'postcss-scss';
import * as autoprefixer from 'autoprefixer';
import * as stylelint from 'stylelint';
import * as doiuse from 'doiuse';

import { ROUTES_PREFIX } from '../src/core/constants';
import getEnvParams from '../src/core/getEnvParams';
import { LANGUAGES } from '../src/services/i18n/constants';

export type BuildType = 'dev' | 'prod' | 'server';

const { chunkHash, withAnalyze, chunkName, withHot, withoutTypeChecking, isWatchMode, forGhPages } = getEnvParams();

const workerPool = {
  workers: require('os').cpus().length - 1,
  poolTimeout: withHot ? Infinity : 2000,
};

isWatchMode && threadLoader.warmup(workerPool, [
  'babel-loader',
  'ts-loader',
  'postcss-loader',
  'sass-loader',
]);

export const getCommonPlugins: (type: BuildType) => webpack.Plugin[] = (type) => [
  new CleanWebpackPlugin(['build', 'static'], { root: path.resolve(__dirname, '..') }),
  new MiniCssExtractPlugin({
    filename: `css/[name].[${chunkHash}].css`,
    chunkFilename: `css/[id].[${chunkHash}].css`,
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'assets/index.html',
    chunksSortMode: sortChunks,
  }),
  new webpack.DefinePlugin({
    '__HOST__': JSON.stringify('http://localhost:3000'),
    '__LANG__': JSON.stringify(process.env.LANG || 'en'),
    '__CLIENT__': true,
    '__SERVER__': false,
    ...getEnvForDefinePlugin(),
  }),
  new FaviconsWebpackPlugin(path.resolve(__dirname, '..', 'src', 'assets', 'favicon.png')),
  new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, new RegExp(LANGUAGES.join('|'))),
  new CircularDependencyPlugin({
    exclude: /node_modules/,
    failOnError: true,
  }),
]
  // http://www.backalleycoder.com/2016/05/13/sghpa-the-single-page-app-hack-for-github-pages/
  .concat(forGhPages ? (
    new HtmlWebpackPlugin({
      filename: '404.html',
      template: 'assets/index.html',
      chunksSortMode: sortChunks,
    })
  ) : [])
  .concat(forGhPages ? new FileManagerWebpackPlugin({
    onEnd: {
      copy: [
        {
          source: `src/assets/ghPageRoot/**`,
          destination: `build`,
        },
      ],
    },
  }) : [])
  .concat(isWatchMode && !withoutTypeChecking ? (
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      async: false,
      tsconfig: path.resolve(__dirname, '..', 'tsconfig.json'),
      tslint: path.resolve(__dirname, '..', 'tslint.json'),
      reportFiles: [
        '**',
        '!**/*.json',
      ],
    })) : [])
  .concat(withAnalyze ? (
    new BundleAnalyzerPlugin()
  ) : [])
  .concat(withHot && type !== 'prod' ? (
    new webpack.HotModuleReplacementPlugin()
  ) : []);

function sortChunks(a: webpack.compilation.Chunk, b: webpack.compilation.Chunk) {
  const order = ['app', 'vendors', 'runtime'];
  return order.findIndex(
    // webpack typings for Chunk are not correct wait for type updates for webpack.compilation.Chunk
    item => (b as any).names[0].includes(item)) - order.findIndex(item => (a as any).names[0].includes(item),
    );
}

function getEnvForDefinePlugin() {
  const allowed = [
    'NODE_ENV', 'WATCH_MODE', 'BUNDLE_ANALYZE_MODE', 'WITHOUT_TYPES_CHECKING', 'FOR_GH_PAGES', 'NETWORK',
  ];
  return Object.entries(process.env).reduce(
    (acc, [name, value]) => allowed.includes(name)
      ? ({ ...acc, [`process.env.${name}`]: JSON.stringify(value) })
      : acc,
    {},
  );
}

export const getCommonRules: (type: BuildType) => webpack.Rule[] = (type) => [
  {
    test: /\.tsx?$/,
    use: ([] as webpack.Loader[])
      .concat(isWatchMode ? {
        loader: 'thread-loader',
        options: workerPool,
      } : [])
      .concat(withHot && type === 'dev' ? {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          plugins: [
            'react-hot-loader/babel',
            new ReactJssHmrPlugin(),
            'syntax-dynamic-import',
          ],
        },
      } : [])
      .concat({
        loader: 'ts-loader',
        options: {
          transpileOnly: isWatchMode,
          happyPackMode: isWatchMode,
          logLevel: 'error',
        },
      }),
  },
  {
    test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
    use: 'file-loader?name=fonts/[hash].[ext]',
  },
  {
    test: /\.(png|svg)/,
    loader: 'url-loader',
    options: {
      name: 'images/[name].[ext]',
      limit: 10000,
    },
  },
];

export function getStyleRules(type: BuildType) {
  const cssLoaders: Record<BuildType, webpack.Loader[]> = {
    dev: ['style-loader', 'css-loader'],
    prod: [MiniCssExtractPlugin.loader, 'css-loader'],
    server: ['css-loader/locals'],
  };
  const scssFirstLoaders: Record<BuildType, webpack.Loader[]> = {
    dev: ['style-loader', 'css-loader?importLoaders=1'],
    prod: [MiniCssExtractPlugin.loader, 'css-loader?importLoaders=1'],
    server: ['css-loader/locals?importLoaders=1'],
  };

  return [
    {
      test: /\.css$/,
      use: cssLoaders[type],
    },
    {
      test: /\.scss$/,
      use: (scssFirstLoaders[type]).concat(commonScssLoaders),
    },
  ];
}

const commonScssLoaders: webpack.Loader[] = [
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => {
        return [
          autoprefixer({
            browsers: ['last 2 versions'],
          }),
        ];
      },
    },
  },
  'sass-loader',
  {
    loader: 'postcss-loader',
    options: {
      syntax: postcssSCSS,
      plugins: () => {
        return [
          stylelint(),
          doiuse({
            // https://github.com/browserslist/browserslist
            // to view resulting browsers list, use the command in terminal `npx browserslist "defaults, not ie > 0"`
            browsers: ['defaults', 'not op_mini all', 'not ie > 0', 'not ie_mob > 0'],
            ignore: [],
            ignoreFiles: ['**/normalize.css'],
          }),
        ];
      },
    },
  },
];

export const commonConfig: webpack.Configuration = {
  target: 'web',
  context: path.resolve(__dirname, '..', 'src'),
  output: {
    publicPath: ROUTES_PREFIX + '/',
    path: path.resolve(__dirname, '..', 'build'),
    filename: `js/[name]-[${chunkHash}].bundle.js`,
    chunkFilename: `js/[${chunkName}]-[${chunkHash}].bundle.js`,
  },
  resolve: {
    modules: ['node_modules', 'src', path.resolve('ethereum-contracts', 'build')],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    plugins: withHot ? [
      new ReactJssHmrPlugin(),
    ] : undefined,
    alias: {
      'ethers$': 'ethers/dist/ethers.js',
    },
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },
  stats: {
    // typescript would remove the interfaces but also remove the imports of typings
    // and because of this, warnings are shown https://github.com/TypeStrong/ts-loader/issues/653
    warningsFilter: /export .* was not found in/,
    assets: false,
    modules: false,
  },
  devServer: {
    hot: withHot,
    contentBase: path.resolve('..', 'build'),
    host: '0.0.0.0',
    port: 8080,
    inline: true,
    lazy: false,
    historyApiFallback: true,
    disableHostCheck: true,
    stats: {
      colors: true,
      errors: true,
      errorDetails: true,
      warnings: true,
      assets: false,
      modules: false,
      warningsFilter: /export .* was not found in/,
    },
  },
};
