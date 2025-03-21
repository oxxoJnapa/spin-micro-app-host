import ModuleNotAvailable from '../components/ModuleNotAvailable';
import React from 'react';

export default async function safeImport(module: string, moduleName: string) {
  try {
    return await import(module);
  } catch (error) {
    return { default: () => <ModuleNotAvailable moduleName={moduleName} /> };
  }
}
