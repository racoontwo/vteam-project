import database from '../../db/database.mjs';
import { ObjectId } from 'mongodb';

const customers = {
    getAllCustomers: async function getAllCustomers() {
        try {
            const db = await database.getCollection('customers');
            const result = await db.collection.find({}).toArray();

            await db.client.close();
            return result;
        } catch (error) {
        console.error('Error fetching customers:', error);
        throw new Error('Failed to fetch customers');
        }
    },
    addCustomer: async function addCustomer({ firstName, lastName }) {
        try {
            const db = await database.getCollection('customers');
            const result = await db.collection.insertOne({ firstName, lastName });

            await db.client.close();
            return result;
        } catch (error) {
            console.error('Failed to insert data into database:', error);
            throw new Error('Database insertion failed' + error.message);
        }
    },
}

export default customers;