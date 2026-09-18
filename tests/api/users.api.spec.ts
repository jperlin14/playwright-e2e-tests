import { test, expect } from '@playwright/test';
import { log } from '../helpers/logger.js';

test.describe('REST API Demo', () => {
    const baseUrl = 'https://reqres.in/api';

    // GET method
    test('Should get list of users:', async ({ request }) => {
        // Make a GET call to the API endpoint
        await log('info', `Making a GET call using ${baseUrl}`);
        const res = await request.get(`${baseUrl}/users?page=2`, {
            headers: {
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
        await log('info', `Making a POST call using ${baseUrl}`);
       
        const payload = {
            name: 'John Doe',
            job: 'Software Engineer',
            id: '125',
            createdAt: '2023-08-01T12:34:56.789Z',
        };
        
        const res = await request.post(`${baseUrl}/users`, {
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
