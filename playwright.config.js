// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir: './tests',
 // testDir:'./tests/ClientApp.spec.js',
  timeout:40*1000,  // it is applied to every step
  expect:{
    timeout: 5000 // it is applied to expect assertion
  },
  reporter: 'html',
  use:{
  browserName:'chromium',
  headless:false,
  },
});

module.exports =config

