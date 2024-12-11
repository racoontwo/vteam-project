process.env.NODE_ENV = 'test';

import request from 'supertest';
import { expect } from 'chai';
import appdata from '../app.mjs'; // Adjust the path to your app file

const app = appdata.app;

describe('POST /add-customer', () => {
    it('should add a new customer when firstName and lastName are provided', async () => {
        const newCustomer = {
            firstName: 'John',
            lastName: 'Doe'
        };

        const res = await request(app)
            .post('/api/v1/customers/add-customer')
            .send(newCustomer)
            .expect(200);

        expect(res.body).to.have.property('message', 'Data received and inserted');
        expect(res.body.data).to.deep.equal(newCustomer);
    });

    it('should return 400 if firstName or lastName is missing', async () => {
        const incompleteCustomer = { firstName: 'John' }; // Missing lastName

        const res = await request(app)
            .post('/api/v1/customers/add-customer')
            .send(incompleteCustomer)
            .expect(400);

        expect(res.body).to.have.property('error', 'Full name is required');
    });
});

describe('GET /all-customers', () => {
    it('should return all customers from collection customers', async () => {
        const newCustomer = { firstName: 'Jane', lastName: 'Doe' };
    
        await request(app)
            .post('/api/v1/customers/add-customer')
            .send(newCustomer)
            .expect(200);
    
        // Now, fetch all customers
        const res = await request(app)
            .get('/api/v1/customers/all-customers')
            .expect(200);
    
        // Print the response for debugging
        // console.log("Response body: ", res.body);
    
        // Check that the response contains 'data' and that it's an array
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
    
        // Check if the length of the 'data' array is greater than 0
        expect(res.body.data.length).to.be.greaterThan(0);
    });
});
