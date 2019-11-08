import { Config } from '@stencil/core';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export const config: Config = {
  namespace: 'mycomponents',
  plugins: [
    nodePolyfills(),
  ],
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null,
      baseUrl: 'https://conference.ionicframework.com/'
    }
  ],
  globalStyle: 'src/global.css',
  copy: [
    { src: 'robots.txt' }
  ]
};
