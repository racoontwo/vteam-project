import database from '../../db/database.mjs';
import { ObjectId } from 'mongodb';

const customers = {
    getAllCustomers: async function getAllCustomers() {
        let db;
        try {
            const db = await database.getCollection('customers');
            const result = await db.collection.find({}).toArray();

            return result;
        } catch (error) {
        console.error('Error fetching customers:', error);
        throw new Error('Failed to fetch customers');
        } finally {
            if (db) {
                await db.client.close(); // Ensure the client is always closed
            }
        }
    },

    addCustomer: async function addCustomer(data) {
        let db;
        try {
            const db = await database.getCollection('customers');
            const result = await db.collection.insertOne(data);

            return result;
        } catch (error) {
            console.error('Failed to insert data into database:', error);
            throw new Error('Database insertion failed' + error.message);
        } finally {
            if (db) {
                await db.client.close(); // Ensure the client is always closed
            }
        }
    },

    deleteOneCustomer: async function deleteOneCustomer(id) {
        let db;
        try {
            const db = await database.getCollection('customers');
            const result = await db.collection.deleteOne({ _id: new ObjectId(id) });

            return result;
        } catch (error) {
            console.error('Error deleting customer from database:', error);
            throw new Error('Customer deletion failed');
        } finally {
            if (db) {
                await db.client.close(); // Ensure the client is always closed
            }
        }
    },

    deleteAllCustomers: async function deleteAllCustomers() {
        let db;
        try {
            const db = await database.getCollection('customers');
            const result = await db.collection.deleteMany({});
            return result;
        } catch (error) {
            console.error('Error deleting data from MongoDB:', error);
            throw new Error('Database deletion failed');
        } finally {
            if (db) {
                await db.client.close(); // Ensure the client is always closed
            }
        }
    }
}

export default customers;