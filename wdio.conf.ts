import { iosCaps } from './appium.config';

exports.config = {
    runner: 'local',
    specs: ['./features/**/*.feature'],
    framework: 'cucumber',
    cucumberOpts: {
        require: ['./src/steps/*.ts', './src/support/*.ts'],
        timeout: 60000
    },
    reporters: ['spec', ['allure', { outputDir: 'allure-results' }]],
    services: ['appium'],
    port: 4723,
    capabilities: [iosCaps]
};
