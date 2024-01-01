import { defineConfig } from 'cypress';
import pluginConfig from './cypress/plugins';

export default defineConfig({
  projectId: 'qiozua',
  viewportWidth: 1280,
  viewportHeight: 720,
  fixturesFolder: 'cypress/fixtures',
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  video: false,

  e2e: {
    baseUrl: 'http://localhost:4173',
    setupNodeEvents(on, config) {
      return pluginConfig(on, config);
    },
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});
