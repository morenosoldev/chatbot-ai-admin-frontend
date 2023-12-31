import codeCoverageTask from '@cypress/code-coverage/task';
import mergeReports from 'cypress-sonarqube-reporter/mergeReports';

/**
 * @type {Cypress.PluginConfig}
 */
const pluginConfig = (on, config) => {
  /*
  on('after:run', (results) => {
    return mergeReports(results);
  });

  codeCoverageTask(on, config);
  */

  return config;
};

export default pluginConfig;
