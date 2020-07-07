import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'one-for-all',
  // globalStyle: 'src/global/variable.css',
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
    }
  ]
};
