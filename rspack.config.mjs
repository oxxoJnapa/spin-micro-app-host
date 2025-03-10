import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as Repack from '@callstack/repack';
import { ReanimatedPlugin } from '@callstack/repack-plugin-reanimated';
import rspack from '@rspack/core';
import sharedModules from './shared.modules.js';
import { getMicroApps } from './remote.apps.config.js';
import TerserPlugin from 'terser-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * More documentation, installation, usage, motivation and differences with Metro is available at:
 * https://github.com/callstack/repack/blob/main/README.md
 *
 * The API documentation for the functions and plugins used in this file is available at:
 * https://re-pack.dev
 */

/**
 * Webpack configuration.
 * You can also export a static object or a function returning a Promise.
 *
 * @param env Environment options passed from either Webpack CLI or React Native Community CLI
 *            when running with `react-native start/bundle`.
 */
export default (env) => {
  const {
    mode,
    platform = process.env.PLATFORM,
    devServer,
    minimize = mode === 'production',
  } = env;

  if (!platform) {
    throw new Error('Missing platform');
  }

  return {
    mode,
    devtool: "source-map",
    context: __dirname,
    entry: './index.js',
    resolve: Object.assign(Repack.getResolveOptions(platform), {}),
    output: {
      path: path.resolve(__dirname, "build/generated", platform),
    },
    optimization: {
      minimize,
      minimizer: [
        new TerserPlugin({
          test: /\.(js)?bundle(\?.*)?$/i,
          /**
           * Prevents emitting text file with comments, licenses etc.
           * If you want to gather in-file licenses, feel free to remove this line or configure it
           * differently.
           */
          extractComments: false,
          terserOptions: {
            format: {
              comments: false,
            },
          },
        }),
      ],
    },
    module: {
      rules: [
        ...Repack.getJsTransformRules(),
        ...Repack.getAssetTransformRules(),
      ],
    },
    plugins: [
      new Repack.RepackPlugin({
        extraChunks: [
          {
            test: /.*/,
            type: 'local',
          },
        ]
      }),
      new ReanimatedPlugin(),
      new Repack.plugins.HermesBytecodePlugin({
        enabled: mode === 'production' && !devServer,
        test: /\.(js)?bundle$/,
        exclude: /index.bundle$/,
      }),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'host',
        remotes: getMicroApps(platform, mode !== 'production'),
        reactNativeDeepImports: true,
        shared: sharedModules,
      }),
      // silence missing @react-native-masked-view optionally required by @react-navigation/elements
      new rspack.IgnorePlugin({
        resourceRegExp: /^@react-native-masked-view/,
      }),
    ],
  };
};
