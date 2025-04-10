import type {FederationRuntimePlugin} from '@module-federation/enhanced/runtime';

const sharedStrategy: () => FederationRuntimePlugin = () => ({
  name: 'remote-fallback-plugin',
  async errorLoadRemote() {
    const GeneralModuleNotAvailable = await import('../components/GeneralModuleNotAvailable');
    return () => ({
      __esModule: true,
      default: GeneralModuleNotAvailable,
    });
  },
});

export default sharedStrategy;
