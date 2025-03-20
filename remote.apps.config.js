const packageJson = require('./package.json');

/**
 * here you can configure the path of your micro-apps
 *
 * The final url will depend if you are building the application on developer mode or release mode.
 *
 * For release mode you should define the env variable MICRO_APPS_DOMAIN, this mostly consumed on the pipeline
 *
 * Example of final url on debug mode:
 *
 * Structure:
 * <micro-app-name>@<domain>:<port>/<platform>/mf-manifest.json
 *
 * {
 *   app1: 'app1@http://localhost:9000/ios/mf-manifest.json',
 * }
 *
 * Example of final url on release mode:
 *
 * Structure:
 * <micro-app-name>@<domain>/<host-version>/<micro-app-folder>/mf-manifest.json
 *
 * {
 *   app1: 'app1@https://my-domain.com/1.0.0/micro-app-folder/mf-manifest.json',
 * }
 * */
function getMicroApps(platform) {
  const isDev = false;
  function getDomain({ appDomain, localDomain }) {
    if (isDev) {
      return localDomain;
    }
    return appDomain;
  }

  function createRemoteApp({appName, appDomain = process.env.MICRO_APPS_DOMAIN, localDomain, appRemoteFolderName}) {
    const _domain = getDomain({ appDomain, localDomain });
    const _platform = isDev ? `/${platform}` : '';
    const _hostVersion = isDev ? '' : `/${packageJson.version}`;
    const _remoteFolder = isDev ? '' : `/${appRemoteFolderName}`;

    return `${appName}@${_domain}${_hostVersion}${_remoteFolder}${_platform}/mf-manifest.json`;
  }

  return {
    app1: createRemoteApp({appName: 'app1', appRemoteFolderName: 'micro-app-1', localDomain: 'http://localhost:9000', appDomain: 'https://d2e6qco24lqb4t.cloudfront.net'}),
    app2: createRemoteApp({appName: 'app2', appRemoteFolderName: 'micro-app-2', localDomain: 'http://localhost:9001', appDomain: 'https://d2e6qco24lqb4t.cloudfront.net'}),
  };
}

module.exports = { getMicroApps };
