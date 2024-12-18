import database from '../../db/database.mjs';
import { ObjectId } from 'mongodb';

const admins = {
    getAllAdmins: async function getAllAdmins() {
        let db;

        try {
            const db = await database.getCollection('admins');
            const result = await db.collection.find({}).toArray();

            return result;
        } catch (error) {
            console.error('Error fetching the data:', error);
            throw new Error('Failed to fetch admins');
        } finally {
            if (db) {
                await db.client.close();
            }
        }
    },

    getAdmin: async function getAdmin(id) {
        let db;

        try {
            const db = await database.getCollection('admins');
            const result = await db.collection.find(new ObjectId(id)).toArray();

            return result;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error('Failed to fetch admin data');
            } finally {
                if (db) {
                    await db.client.close();
                }
            }
    },

    newAdmin: async function newAdmin(data) {
        let db;

        try {
            const db = await database.getCollection('admins');
            const result = await db.collection.insertOne(data);

            return result;
        } catch (error) {
            console.error('Failed to insert data into database:', error);
            throw new Error('Database insertion failed' + error.message);
        } finally {
            if (db) {
                await db.client.close();
            }
        }
    },

    updateAdmin: async function updateAdmin(customerId, updatedData) {
        let db;

        try {
            const db = await database.getCollection('admins')
            const result = await db.collection.updateOne(
                { _id: new ObjectId(customerId) },
                { $set: updatedData }
            );

            // Check for matches and updates
            if (result.matchedCount === 0) {
                throw new Error('No admin found with the given ID.');
            }
            return result
        } catch (error) {
            throw error; // Rethrow the error so it can be caught in the route handler
        } finally {
            if (db) {
                await db.client.close();
            }
        }
    },

    deleteAdmin: async function deleteAdmin(id) {
        let db;

        try {
            const db = await database.getCollection('admins');
            const result = await db.collection.deleteOne({ _id: new ObjectId(id) });

            return result;
        } catch (error) {
            console.error('Error deleting admin from database:', error);
            throw new Error('Admin deletion failed');
        } finally {
            if (db) {
                await db.client.close();
            }
        }
    },

    deleteAllAdmins: async function deleteAllAdmins() {
        let db;

        try {
            const db = await database.getCollection('admins');
            const result = await db.collection.deleteMany({});
            return result;
        } catch (error) {
            console.error('Error deleting all admins from MongoDB:', error);
            throw new Error('Admin deletion failed');
        } finally {
            if (db) {
                await db.client.close();
            }
        }
    }
}

export default admins;