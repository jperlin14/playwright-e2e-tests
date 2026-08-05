import fs from 'fs';
// import { log } from './logger.js';
import { parse } from 'csv-parse/sync';

/**
 * Reads file and returns string. For JSON, parse it before using.
 */
function readFile(filePath: string): any {
    if (!fs.existsSync(filePath)) {
        throw new Error(`No file exists with given name: ${filePath}`);
    }
    // The reusable logger has not yet been implemented, so this line is commented out for now.
    // log('info', `Reading file: ${filePath}`);
    let data = fs.readFileSync(filePath, 'utf-8');
    return data;
}

/**
 * Writes to target file. If the target is JSON, stringify it before writing.
 */
function writeFile(filePath: string, data: string) {
    try {
        fs.writeFileSync(filePath, data, 'utf-8');
        // The reusable logger has not yet been implemented, so this line is commented out for now.
        // log('info', `Wrote to file: ${filePath}`);
    } catch (err) {
        new Error(`Error writing to file: ${filePath}. Error: ${err}`);
    }
}

/**
 * Reads the contents of a CSV file and returns the parsed data as an array of objects.
 * @param filepath
 * @returns array of objects
 */
function readCSV(filepath: string): any[] {
    // Read the contents of the CSV file.
    const csvDataStr = fs.readFileSync(filepath, {
        encoding: 'utf-8',
    });

    // Parse the CSV text into an array of JavaScript objects.
    const csvDataArr = parse(csvDataStr, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
    });

    return csvDataArr;
}

// Export the functions so they can be used in other files.
export default {
    readFile,
    writeFile,
    readCSV,
};
