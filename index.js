/**
 * @format
 */
import 'react-native-gesture-handler';

import {AppRegistry, Platform} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {ScriptManager, Script, Federated} from '@callstack/repack/client';

const packageJson = require('package.json');

const baseLocalDomain = 'http://127.0.0.1';
const baseRemoteDomain = 'https://d2e6qco24lqb4t.cloudfront.net';

function getMicroAppLocalUrl({ localPort }) {
  return `${baseLocalDomain}:${localPort}/[name][ext]`;
}

const resolveModuleFederated = Federated.createURLResolver({
  containers: {},
});

async function getContainers() {
  if (__DEV__) {
    return {
      app1: getMicroAppLocalUrl({ localPort: '9000' }),
      app2: getMicroAppLocalUrl({ localPort: '9001' }),
    };
  }

  /**
   * Getting containers manifest from remote server
   * */
  const response  = await fetch(`${baseRemoteDomain}/host-app/${packageJson.version}/containers.json`);
  return response.json();
}

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
