// ============================================================================
// global-setup.ts
//
// This file contains the Global Setup function for our Playwright project.
//
// Playwright executes this function ONE TIME before any tests begin.
//
// In this example, we use Global Setup to delete the previous
// "allure-results" folder so that every test execution starts with a
// clean reporting directory.
// ============================================================================

// Import the FullConfig TYPE from Playwright.
//
// FullConfig describes the complete Playwright configuration that is
// passed into the Global Setup function when the test run begins.
//
// The 'type' keyword tells TypeScript that this import is only needed
// while checking your code for errors before it runs.
//
// Since this information isn't needed when the program executes,
// it is removed when the TypeScript code is compiled into JavaScript.
import { type FullConfig } from '@playwright/test';

// Import Node.js's built-in Path module.
//
// The Path module provides helper functions for creating and working
// with file and directory paths.
//
// Instead of manually building file paths using strings,
// the Path module automatically creates paths that work correctly
// on Windows, macOS, and Linux.
import path from 'path';

// Import Node.js's built-in File System (fs) module.
//
// The File System module allows your program to interact with files
// and directories on your computer.
//
// In this lesson we'll use it to:
//   • Check whether the "allure-results" folder exists.
//   • Delete the folder before a new test run begins.
import fs from 'fs';

// ============================================================================
// Global Setup Function
//
// Playwright automatically calls this function ONE TIME before executing
// any Playwright tests.
//
// The function receives a FullConfig object that contains the complete
// Playwright configuration for the current test run.
//
// NOTE:
// The "config" parameter isn't used yet.
//
// We include it because this is the function signature expected by
// Playwright, and we'll use it later in this chapter when we introduce
// environment-specific behavior.
// ============================================================================
export default async function globalSetup(config: FullConfig) {
    console.log(`[INFO]: Starting the global setup...`);
    if (process.env.RUNNER?.toUpperCase() === 'LOCAL') {
        const resultsDir = path.resolve(process.cwd(), 'allure-results');

        // Display the directory path in the console.
        //
        // This helps verify that Playwright is pointing to the correct
        // location before attempting to delete anything.
        //
        // Example output:
        //
        // >> resultsDir:
        // C:\Users\Jeff\PlaywrightTraining\allure-results
        console.log(`>> resultsDir: ${resultsDir}`);

        // ------------------------------------------------------------------------
        // Check whether the "allure-results" directory already exists.
        //
        // If it doesn't exist, there is nothing to delete and the cleanup
        // step is skipped.
        // ------------------------------------------------------------------------
        if (fs.existsSync(resultsDir)) {
            console.log(`[INFO]: Detecting local runs...`);
            // Delete the entire "allure-results" directory.
            //
            // rmSync()
            //     Deletes the directory synchronously.
            //
            //     "Synchronously" means Node.js waits until the folder has
            //     been completely deleted before moving on to the next line
            //     of code.
            //
            // recursive: true
            //     Delete the folder and EVERYTHING inside it, including
            //     all files and subfolders.
            //
            // force: true
            //     Prevent an error if the folder has already been removed
            //     or cannot be found.
            fs.rmSync(resultsDir, {
                recursive: true,
                force: true,
            });

            // Inform the user that the previous Allure results
            // have been successfully removed.
            console.log('>> Previous Allure results folder deleted.');
        } else {
            // The folder wasn't found.
            //
            // This usually means:
            //   • This is the first execution of the project.
            //   • The folder has already been deleted.
            console.log('>> No existing Allure results folder found.');
        }
    }
    // ------------------------------------------------------------------------
    // Build the full (absolute) path to the "allure-results" directory.
    //
    // process.cwd()
    //     Returns the current working directory, which is normally
    //     the root folder of the Playwright project.
    //
    // path.resolve()
    //     Combines the project root with "allure-results" to create
    //     a complete file path.
    //
    // Example:
    // C:\Users\Jeff\PlaywrightTraining\allure-results
    // ------------------------------------------------------------------------
    console.log(`[INFO]: Completed the global setup.`);

    // ******ALL OTHER ONE-OFF TASKS GO HERE...******

    // Initialize a shared runtime variable that will later store the login cookies.
    //
    // At this point, no login has occurred, so the value is set to undefined.
    // During the test run, this variable will be populated with the login cookies
    // after they have been generated.
    //
    // Once populated, the value can be accessed anywhere in the Playwright project
    // using:
    //
    //     process.env.LOGIN_COOKIES
    //
    process.env.LOGIN_COOKIES = undefined;
}
