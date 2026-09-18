import { test, expect } from '@playwright/test';
import { log } from '../helpers/logger.js';
import constants from '../../data/constants.json';
import testData from '../../data/test-data';

test.describe('REST API Demo', () => {
    let envConfig: any;

    test.beforeEach(async ({ request }, testInfo) => {
        envConfig = testInfo.project.use as any;
    });

    // GET method
    test('Should get list of users:', async ({ request }) => {
        // Make a GET call to the API endpoint
        await log('info', `Making a GET call using ${envConfig.apiURL}`);
        // Goes to constants.json file and is not hardcoded in the code snippet
        const res = await request.get(`${envConfig.apiURL}${constants.REQ_RES_ENDPOINTS.GET_USERS_LIST}`, {
            headers: {
                // Goes to .env file and is not hardcoded in the code snippet
                'x-api-key': process.env.REQRES_API_KEY!,
            },
        });

        // Assert the response status code
        expect(res.status()).toBe(200);
        await log('info', `Response status code: ${res.status()}`);

        // GET list of users from the response body
        const responseBody = await res.json();
        const users = responseBody.data;
        await log('info', `List of users: ${JSON.stringify(users)}`);
    });

    // POST method
    test('Should create a new user:', async ({ request }) => {
        // Make a POST call to the API endpoint
        await log('info', `Making a POST call using ${envConfig.apiURL}`);
        const payload = testData.apiUserCreation()[0]; // Get the first user data from the test data

        const res = await request.post(`${envConfig.apiURL}${constants.REQ_RES_ENDPOINTS.POST_USER}`, {
            headers: {
                'x-api-key': process.env.REQRES_API_KEY!,
                'Content-Type': 'application/json',
            },
            data: payload,
        });
        // Assert the response status code
        expect(res.status()).toBe(201);
        await log('info', `Post call successful. Response status code: ${res.status()}`);

        // Get the created user data from the response body
        const userData = await res.json();
        await log('info', `Response data from POST call. Created user data: ${JSON.stringify(userData)}`);
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
