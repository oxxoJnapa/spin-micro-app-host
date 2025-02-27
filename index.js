/**
 * @format
 */
import 'react-native-gesture-handler';

import {AppRegistry, Platform} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {ScriptManager, Script, Federated} from '@callstack/repack/client';

const baseLocalDomain = 'http://127.0.0.1';
const baseRemoteDomain = 'https://d2e6qco24lqb4t.cloudfront.net';

function getMicroAppUrl({ basePath, localPort }) {
  if (__DEV__) {
    return `${baseLocalDomain}:${localPort}/[name][ext]`;
  }
  return `${baseRemoteDomain}/${basePath}/[name][ext]`;
}

const resolveModuleFederated = Federated.createURLResolver({
  containers: {
    app1: getMicroAppUrl({ basePath: 'micro-app-1', localPort: '9000' }),
    app2: getMicroAppUrl({ basePath: 'micro-app-2', localPort: '9001' }),
  },
});

ScriptManager.shared.addResolver(async (scriptId, caller) => {
  /**
   * caller will be equal to main when the script is requested from the host application.
   * */
  if (caller === 'main') {
    /** Extract all lazy local chunks from development local server */
    if (__DEV__) {
      return {
        url: Script.getDevServerURL(scriptId),
        cache: false,
      };
    }

    /** Extract all lazy remote chunks from remote server */
    /*return {
      url: Script.getRemoteURL(`${baseDomain}/host-app/${scriptId}`),
    };*/

    /** Extract all lazy local chunks from local file system */
    return {
      url: Script.getFileSystemURL(scriptId),
    };
  }

  const federatedModuleUrl = resolveModuleFederated(scriptId, caller);

  return {
    url: federatedModuleUrl,
    cache: false,
    query: {
      platform: Platform.OS,
    },
    verifyScriptSignature: __DEV__ ? 'off' : 'strict',
  };
});

if (__DEV__) {
  require('./ReactotronConfig');
}

AppRegistry.registerComponent(appName, () => App);
