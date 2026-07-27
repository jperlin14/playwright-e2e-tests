import { FullConfig } from "@playwright/test";
import { exec } from "node:child_process";

/**
 * Global Teardown
 *
 * This function is executed one time after ALL Playwright tests have completed,
 * regardless of how many test files or workers were used.
 *
 * Common uses include:
 * - Cleaning up temporary files
 * - Removing test data
 * - Closing external resources
 * - Generating reports
 * - Launching the Allure report for local execution
 */
export default async function globalTeardown(config: FullConfig) {

    console.log("[INFO]: Starting the global teardown process...");

    /**
     * Only launch the Allure report when running tests locally.
     *
     * This prevents CI/CD pipelines from attempting to open a browser window,
     * which would fail because build servers typically run without a desktop.
     *
     * The optional chaining operator (?.) prevents an error if the RUNNER
     * environment variable has not been defined.
     */
    if (process.env.RUNNER?.toUpperCase() === "LOCAL") {

        console.log(">> Local run detected - starting Allure server...");

        /**
         * Execute the same command you would normally type in the terminal:
         *
         *     allure serve
         *
         * This generates the Allure report, starts a temporary web server,
         * and automatically opens the report in your default browser.
         */
        exec("allure serve", (error, stdout, stderr) => {

            /**
             * If the Allure command cannot be executed (for example,
             * Allure is not installed or cannot be found), display
             * a helpful error message.
             */
            if (error) {
                console.error(
                    "ERROR: Unable to start the Allure server:",
                    error.message
                );
            }

            /**
             * Note:
             * stdout and stderr are available if you want to capture
             * the command output, but they are not needed in this example.
             */
        });
    }

    console.log("[INFO]: Completed the global teardown process...");
}