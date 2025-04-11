import { FederationRuntimePlugin } from '@module-federation/enhanced/runtime';

const sharedStrategy: () => FederationRuntimePlugin = () => ({
  name: 'fetch-with-auth',
  async fetch(manifestUrl, requestInit) {
    const _manifestUrl = `${manifestUrl}?vmfh=${Date.now()}`;
    return fetch(_manifestUrl, {
      ...requestInit,
      headers: {
        ...(requestInit.headers ?? {}),
        'x-custom-auth': '123',
      },
    });
  },
});

export default sharedStrategy;
