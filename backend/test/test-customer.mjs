process.env.NODE_ENV = 'test';

import request from 'supertest';
import { expect } from 'chai';
import appdata from '../app.mjs'; // Adjust the path to your app file
import database from '../db/database.mjs'

const app = appdata.app;

describe('POST /add-customer', () => {
    it('should add a new customer when firstName and lastName are provided', async () => {
        const newCustomer = {
            firstName: 'John',
            lastName: 'Doe'
        };

        const res = await request(app)
            .post('/api/v1/customers/new-customer')
            .send(newCustomer)
            .expect(200);

        expect(res.body).to.have.property('message', 'Data received and inserted');
        expect(res.body.data).to.include.all.keys('firstName', 'lastName', '_id');
        expect(res.body.data.firstName).to.equal('John');
        expect(res.body.data.lastName).to.equal('Doe');
    });

    // it('should return 400 if firstName or lastName is missing', async () => {
    //     const incompleteCustomer = { firstName: 'John' };

    //     const res = await request(app)
    //         .post('/api/v1/customers/add-customer')
    //         .send(incompleteCustomer)
    //         .expect(400);

    //     expect(res.body).to.have.property('error', 'Full name is required');
    // });
});

describe('GET /all-customers', () => {
    it('should return all customers from collection customers', async () => {
        const newCustomer = { firstName: 'Jane', lastName: 'Doe' };
    
        await request(app)
            .post('/api/v1/customers/new-customer')
            .send(newCustomer)
            .expect(200);
    
        // Now, fetch all customers
        const res = await request(app)
            .get('/api/v1/customers/all-customers')
            .expect(200);
    
        // Check that the response contains 'data' and that it's an array
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
    
        // Check if the length of the 'data' array is greater than 0
        expect(res.body.data.length).to.be.greaterThan(0);
    });
});

describe('DELETE', () => {
    let customerId;

    before(async () => {
        // Insert a test customer into the database
        const db = await database.getCollection('customers');
        const customer = {
            firstName: 'John',
            lastName: 'Doe',
        };

        const result = await db.collection.insertOne(customer);
        customerId = result.insertedId;
        await db.client.close();
    });

    it('should delete a customer successfully', async () => {
        const res = await request(app)
            .delete('/api/v1/customers/delete-one-customer') // Make sure this matches your route
            .send({ _id: customerId.toString() })
            .expect(200);

        expect(res.body).to.have.property('message', 'Customer deleted successfully');
    });

    // it('should return 404 if the customer is not found', async () => {
    //     const res = await request(app)
    //         .delete('/api/v1/customers/delete-one-customer')
    //         .send({ _id: new ObjectId().toString() }) // Random non-existent ObjectId
    //         .expect(404);

    //     expect(res.body).to.have.property('message', 'Customer not found');
    // });

    // it('should return 500 if the provided ID is invalid', async () => {
    //     const res = await request(app)
    //         .delete('/api/v1/customers/delete-one-customer')
    //         .send({ _id: 'invalid-id' })
    //         .expect(500);

    //     expect(res.body).to.have.property('error', 'Failed to delete customer');
    // });

    it('should delete all customers successfully', async () => {
        const res = await request(app)
            .delete('/api/v1/customers/delete-all-customers')
            .expect(200);

        expect(res.body).to.have.property('message', 'All customers deleted successfully');
        expect(res.body).to.have.property('result');
        expect(res.body.result).to.have.property('deletedCount').that.is.a('number').and.is.greaterThan(0);
    });
});
