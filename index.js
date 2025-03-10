/**
 * @format
 */
import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {ScriptManager, Script} from '@callstack/repack/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  if (caller === 'main') {
    /** Extract all lazy local chunks from development local server */
    if (__DEV__) {
      return {
        url: Script.getDevServerURL(scriptId),
        cache: false,
      };
    }

    /** Extract all lazy remote chunks from remote server */
    if (/^.+\.remote$/.test(scriptId)) {
      return {
        url: Script.getRemoteURL(`${process.env.MICRO_APPS_DOMAIN}/host-app/${scriptId}`),
      };
    }

    /** Extract all lazy local chunks from local file system */
    return {
      url: Script.getFileSystemURL(scriptId),
    };
  }
});

if (__DEV__) {
  require('./ReactotronConfig');
}

AppRegistry.registerComponent(appName, () => App);
