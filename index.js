/**
 * @format
 */
import 'react-native-gesture-handler';

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {ScriptManager, Script, Federated} from '@callstack/repack/client';

const resolveModuleFederated = Federated.createURLResolver({
  containers: {
    app1: 'https://spin-modules-federated.s3.us-east-1.amazonaws.com/micro-app-1/[name][ext]',
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
  };
});


AppRegistry.registerComponent(appName, () => App);
