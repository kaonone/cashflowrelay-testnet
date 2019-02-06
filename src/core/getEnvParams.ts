import * as packageJson from '../../package.json';

export default function getEnvParams() {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isWatchMode = process.env.WATCH_MODE === 'true';
  const withAnalyze = process.env.BUNDLE_ANALYZE_MODE === 'true';
  const withoutTypeChecking = process.env.WITHOUT_TYPES_CHECKING === 'true';
  const forGhPages = process.env.FOR_GH_PAGES === 'true';

  const appVersion = packageJson.version;

  const chunkName = isProduction ? 'id' : 'name';
  const chunkHash = isWatchMode && !isProduction ? 'hash' : 'chunkhash';
  const withHot = isWatchMode && isDevelopment;

  const network = process.env.NETWORK || '42';

  return {
    isProduction, isDevelopment, isWatchMode, withAnalyze, forGhPages, network,
    chunkName, chunkHash, withHot, appVersion, withoutTypeChecking,
  };
}
