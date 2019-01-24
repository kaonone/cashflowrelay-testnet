import * as packageJson from '../../package.json';

export default function getEnvParams() {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isWatchMode = process.env.WATCH_MODE === 'true';
  const withAnalyze = process.env.BUNDLE_ANALYZE_MODE === 'true';
  const withoutTypeChecking = process.env.WITHOUT_TYPES_CHECKING === 'true';

  const appVersion = packageJson.version;

  const chunkName = isProduction ? 'id' : 'name';
  const chunkHash = isWatchMode && !isProduction ? 'hash' : 'chunkhash';
  const withHot = isWatchMode && isDevelopment;

  return {
    isProduction, isDevelopment, isWatchMode, withAnalyze,
    chunkName, chunkHash, withHot, appVersion, withoutTypeChecking,
  };
}
