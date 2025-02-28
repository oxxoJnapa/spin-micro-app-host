/**
 * @format
 */
import 'react-native-gesture-handler';

import {AppRegistry, Platform} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {ScriptManager, Script, Federated} from '@callstack/repack/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const packageJson = require('./package.json');

const baseLocalDomain = 'http://127.0.0.1';
const baseRemoteDomain = 'https://d2e6qco24lqb4t.cloudfront.net';

/** 1 hour on cache */
const MAX_CACHE_IN_MS = 1000 * 60 * 60;

function getMicroAppLocalUrl({ localPort }) {
  return `${baseLocalDomain}:${localPort}/[name][ext]`;
}

async function getContainers() {
  console.log('Getting containers....');
  if (__DEV__) {
    return {
      app1: getMicroAppLocalUrl({ localPort: '9000' }),
      app2: getMicroAppLocalUrl({ localPort: '9001' }),
    };
  }

  const cachedContainers = await AsyncStorage.getItem('mf_containers');

  console.log('getting containers from cache', cachedContainers);

  if (cachedContainers) {
    const data = JSON.parse(cachedContainers);
    const { containers, lastSync } = data;
    if (lastSync && Date.now() - lastSync < MAX_CACHE_IN_MS) {
      console.log('Returning containers from cache');
      return containers;
    }
  }

  console.log('Getting containers from remote server');

  /**
   * Getting containers manifest from remote server
   * */
  try {
    const response  = await fetch(`${baseRemoteDomain}/host-app/${packageJson.version}/containers.json`);

    if (!response.ok) {
      return {};
    }

    const data = await response.json();
    const containers = data?.containers ?? {};

    console.log('Setting containers in cache');
    await AsyncStorage.setItem('mf_containers', JSON.stringify({ containers, lastSync: Date.now() }));
    console.log('Returning containers from remote server');

    return containers;
  } catch (error) {
    return {};
  }
}

if (!__DEV__) {
  ScriptManager.shared.setStorage({
    getItem: async (key) => {
      console.log('ScriptManager storage - get', {key});
      return AsyncStorage.getItem(key);
    },
    setItem: async (key, value) => {
      console.log('ScriptManager storage - set', {key, value});
      return AsyncStorage.setItem(key, value);
    },
    removeItem: async (key) => {
      console.log('ScriptManager storage - remove', {key});
      return AsyncStorage.removeItem(key);
    },
  });
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

  /**
   * Getting containers from cache or remote server
   * */
  const containers = await getContainers();

  const resolveModuleFederated = Federated.createURLResolver({
    containers,
  });

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
