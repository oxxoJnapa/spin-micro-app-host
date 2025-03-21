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
 * <micro-app-name>@<domain>/<host-remote-folder>/<host-version>/<micro-app-package-name>-manifest.json
 *
 * {
 *   app1: 'app1@https://my-domain.com/host-folder/1.0.0/micro-app-package-name-manifest.json',
 * }
 * */
function getMicroApps(platform, isDev) {
  function createRemoteApp({appName, appDomain = process.env.MICRO_APPS_DOMAIN, localDomain, microAppPackageName, hostRemoteFolderName = process.env.HOST_APP_FOLDER}) {
    let manifestPath = `${appDomain}/${hostRemoteFolderName}/${packageJson.version}/${microAppPackageName}-manifest.json`;

    if (isDev) {
      manifestPath = `${localDomain}/${platform}/mf-manifest.json`;
    }

    return `${appName}@${manifestPath}`;
  }

  return {
    app1: createRemoteApp({
      appName: 'app1',
      microAppPackageName: 'POCRePackMicroApp1',
      localDomain: 'http://localhost:9000',
    }),
    app2: createRemoteApp({
      appName: 'app2',
      microAppPackageName: 'POCRePackMicroApp2',
      localDomain: 'http://localhost:9001',
    }),
  };
}

module.exports = { getMicroApps };
