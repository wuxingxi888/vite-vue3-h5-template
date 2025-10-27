/**
 * Mock plugin for development and production.
 * https://github.com/anncwb/vite-plugin-mock
 */
import { viteMockServe } from 'vite-plugin-mock';

export function configMockPlugin(isEnabled: boolean, isBuild: boolean) {
    return viteMockServe({
        ignore: /^\_/,
        mockPath: 'mock',
        localEnabled: isEnabled,
        prodEnabled: isBuild && isEnabled,
        injectCode: `
      import { setupProdMockServer } from '/mock/_createProductionServer';

      setupProdMockServer();
      `,
        supportTs: true,
        logger: true,
    });
}
