import {FederationRuntimePlugin} from '@module-federation/enhanced/runtime';

const createScriptLocator = async (entryUrl: string, config: any) => {
  if (typeof config === 'function') {
    return await config(entryUrl);
  }
  if (typeof config === 'object') {
    return {
      url: entryUrl,
      ...config,
    };
  }
  return {
    url: entryUrl,
  };
};

const HEADERS_TO_IGNORE = ['x-custom-auth'];

function shouldUpdateWithCache(locator: { [key: string]: any }) {
  function cleanHeaders(headers: { [key: string]: any }) {
    const cleanedHeaders = { ...headers };
    HEADERS_TO_IGNORE.forEach((header) => {
      if (cleanedHeaders[header]) {
        delete cleanedHeaders[header];
      }
    });
    return cleanedHeaders;
  }

  return async function shouldUpdateScript(scriptId?: string, caller?: string) {
    const {
      ScriptManager,
      Script,
    } = require('@callstack/repack/client');

    const cache = ScriptManager.shared.cache;

    const _locator = { ...locator };
    const _cache = { ...cache };

    const newLocatorHeaders = cleanHeaders(_locator.headers ?? {});
    _locator.headers = Object.keys(newLocatorHeaders).length ? newLocatorHeaders : undefined;

    const script = Script.from({
      scriptId,
      caller,
    }, _locator, false);

    const cacheKey = script.locator.uniqueId;
    const cacheSelected = _cache[cacheKey];

    if (cacheSelected) {
      const cacheHeaders = cleanHeaders(cacheSelected.headers ?? {});
      cacheSelected.headers = Object.keys(cacheHeaders).length ? cacheHeaders : undefined;
    }

    if (!cacheSelected) {
      script.locator.fetch = true;
    } else if (script.shouldRefetch(cacheSelected)) {
      script.locator.fetch = true;
    }

    return script.locator.fetch;
  };
}

const sharedStrategy: (config: any) => FederationRuntimePlugin = (config) => ({
  name: 'after-resolve-plugin',
  afterResolve(args) {
    const {
      ScriptManager,
    } = require('@callstack/repack/client');
    const { remoteInfo } = args;
    ScriptManager.shared.addResolver(async (scriptId: string, caller?: string, referenceUrl?: string) => {
      // entry container
      if (scriptId === remoteInfo.entryGlobalName) {
        const locator = await createScriptLocator(remoteInfo.entry, config);
        locator.headers = { ...locator?.headers, 'x-custom-auth': '123' };
        locator.shouldUpdateScript = shouldUpdateWithCache({ ...locator });
        return locator;
      }
      // entry chunks
      if (referenceUrl && caller === remoteInfo.entryGlobalName) {
        const publicPath = remoteInfo.entry.split('/').slice(0, -1).join('/');
        const bundlePath = scriptId + referenceUrl.split(scriptId)[1];
        const url = publicPath + '/' + bundlePath;
        const locator = await createScriptLocator(url, config);
        locator.headers = { ...locator?.headers, 'x-custom-auth': '123' };
        locator.shouldUpdateScript = shouldUpdateWithCache({ ...locator });
        return locator;
      }
    }, {
      key: remoteInfo.entryGlobalName,
    });
    return args;
  },
});

export default sharedStrategy;
