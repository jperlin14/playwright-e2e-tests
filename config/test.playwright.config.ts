// ============================================================================
// test.playwright.config.ts
// ============================================================================
//
// This file creates an environment-specific Playwright configuration.
//
// Rather than duplicating all of the settings defined in the root
// playwright.config.ts file, we import the reusable base configuration and
// extend it with environment-specific settings.
//
// This approach keeps the common Playwright configuration in one place while
// allowing individual environments (such as DEV, QA, UAT, and Production)
// to supply their own configuration values.
// ============================================================================

// Import Playwright's defineConfig() helper.
//
// defineConfig() creates a valid Playwright configuration object.
//
// 'devices' is also imported because we'll use Playwright's predefined device
// configurations later in this chapter (although it isn't used yet).
import { defineConfig, devices } from '@playwright/test';

// Import the reusable base Playwright configuration.
//
// This provides all of the common Playwright settings that are shared by every
// environment (reporters, projects, timeouts, screenshots, video, etc.).
import { baseConfig } from '../playwright.config';

// Import the EnvConfig type.
//
// EnvConfig defines the structure of our custom environment configuration.
// TypeScript uses this definition to validate that the configuration contains
// the expected properties and data types.
// import { EnvConfig } from '../tests/helpers/config-fixtures.ts';
import { EnvConfig } from '../tests/helpers/config-fixtures';

// Import Node.js's built-in path module.
//
// The path module helps build file and folder paths in a reliable,
// platform-independent way. It ensures our configuration works correctly
// regardless of the operating system or the current working directory.
import path from 'path';

// Log a message when this configuration file is loaded.
//
// This provides a quick visual confirmation in the terminal that Playwright
// has loaded the Test environment configuration before executing any tests.
console.log('----- LOADING TEST ENVIRONMENT SETTINGS -----');

// Create the environment-specific Playwright configuration.
//
// <EnvConfig> associates this configuration with the EnvConfig type.
//
// The spread operator (...) copies all settings from the reusable base
// configuration. We then override or add only the settings that are specific
// to this environment.
export default defineConfig<EnvConfig>({
    // Copy all settings from the reusable base configuration.
    ...baseConfig,
    testDir: path.resolve(process.cwd(), './tests'),

    // Override the Playwright 'use' object.
    //
    // The 'use' object contains configuration values that Playwright makes
    // available while the tests are executing.
    use: {
        // Copy all existing 'use' settings from the base configuration.
        //
        // This preserves previously configured values such as screenshots,
        // video recording, traces, browser settings, and any other Playwright
        // options defined in the base configuration.
        ...baseConfig.use,

        // --------------------------------------------------------------------
        // Custom environment configuration
        // --------------------------------------------------------------------

        // Friendly name of this environment.
        //
        // This can be displayed in reports or used to determine which
        // environment is currently being tested.
        envName: 'test',

        // Base URL of the application under test.
        //
        // Tests can reference this value instead of hard-coding URLs.
        appURL: 'https://katalon-demo-cura.herokuapp.com/',
        nopCommerceWeb: 'https://admin-demo.nopcommerce.com/',

        // Database configuration.
        //
        // This object groups all database-related settings together.
        // Although the values are currently empty, they will later be replaced
        // with the appropriate settings for the selected environment.
        dbConfig: {
            // Database server name or address.
            server: '',

            // Database name.
            dbname: '',

            // Database connection string.
            connectionStr: '',
        },
    },
});
