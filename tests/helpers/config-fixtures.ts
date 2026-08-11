// ============================================================================
// config-fixtures.ts
// ============================================================================
//
// This file defines a custom Playwright fixture that provides environment-
// specific configuration values to our tests.
//
// Rather than hard-coding configuration values throughout the project,
// we define them once here. Individual Playwright configuration files can
// later override these values for different environments such as:
//
//   • Development
//   • QA
//   • UAT
//   • Production
//
// This approach makes the tests easier to maintain because the test logic
// remains the same regardless of which environment is being tested.
// ============================================================================

// Import Playwright's built-in test fixture.
//
// We rename it to 'base' because we'll extend it to create our own custom
// fixture named 'test'.
import { test as base } from '@playwright/test';


// ============================================================================
// EnvConfig Type
// ============================================================================
//
// Define and export the EnvConfig type.
//
// A TypeScript type describes the structure of an object. In this case,
// EnvConfig specifies the configuration values that every environment should
// provide.
//
// If another part of the project attempts to provide an incorrect data type
// (for example, assigning a number where a string is expected), TypeScript
// reports the problem during development.
//
export type EnvConfig = {

    // Name of the target environment.
    //
    // Examples:
    //   DEV
    //   QA
    //   UAT
    //   PROD
    envName: string;

    // Base URL of the application being tested.
    //
    // Example:
    //   https://qa.company.com
    appURL: string;

    // Database configuration.
    //
    // This is itself an object that can contain additional key/value pairs,
    // such as:
    //
    // {
    //     server: "...",
    //     database: "...",
    //     username: "...",
    //     password: "..."
    // }
    //
    // We'll expand this object later as our project grows.
    dbConfig: {};
    nopCommerceWeb: string;

    // Additional configuration values can easily be added here later.
};


// ============================================================================
// Create the custom Playwright fixture
// ============================================================================
//
// Extend Playwright's built-in test fixture with our own environment
// configuration.
//
// The "<EnvConfig>" tells TypeScript that our fixture will expose the
// properties defined above.
//
export const test = base.extend<EnvConfig>({

    // Environment name.
    //
    // The first value is the default.
    // The second value tells Playwright that this is a configurable option.
    //
    // Later, another Playwright configuration file can override this value.
    envName: ['test', { option: true }],

    // Default application URL.
    //
    // This placeholder value will later be replaced with the URL for the
    // selected environment.
    appURL: ['<provideURL>', { option: true }],

    // Default database configuration.
    //
    // The empty object indicates that no database configuration has been
    // supplied yet.
    dbConfig: [{}, { option: true }],

    // Default nopCommerce web application URL.
    nopCommerceWeb: ['<provideURL>', { option: true }],

    // Additional configuration options can be added here later.
});