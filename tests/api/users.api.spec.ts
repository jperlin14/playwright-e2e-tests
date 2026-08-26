import { test, expect } from '@playwright/test';
import { log } from '../helpers/logger.js';

test.describe("REST API Demo", () => {
    const baseUrl = 'https://reqres.in/api';

    test("Should get list of users:", async ({request}) => {

            // Make a GET call to the API endpoint
            await log("info", `Making a GET call using ${baseUrl}`)
            const res = await request.get(`${baseUrl}/users?page=2`, {
                headers: {
                    'x-api-key': process.env.REQRES_API_KEY!
                }
            })

            // Assert the response status code
            expect(res.status()).toBe(200);
            await log("info", `Response status code: ${res.status()}`);

            // Get list of users from the response body
            const responseBody = await res.json();
            const users = responseBody.data;
            await log("info", `List of users: ${JSON.stringify(users)}`);

    });
});


/**
 * Generated code snippet from Postman for the above API call:
 * 
 * var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://reqres.in/api/users?page=2',
  'headers': {
    'x-api-key': this is called from the .env file (secrets) and is not hardcoded in the code snippet
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

 */