import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  buildEs5: 'prod',
  namespace: 'one-for-all-ui',
  globalStyle: 'src/global/global.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    },
    reactOutputTarget({
      componentCorePackage: '@one-for-all-ui/core',
      proxiesFile: './bindings/react/src/components.ts',
      includeDefineCustomElements: true,
      includePolyfills: true
    }),
  ],
  extras: {
    cssVarsShim: true,
    dynamicImportShim: true,
    safari10: true,
    shadowDomShim: true,
  }
};
