import database from '../../db/database.mjs';
import { ObjectId } from 'mongodb';

const scooters = {
    getAllScooters: async function getAllScooters() {
        let db;

        try {
            const db = await database.getCollection('scooters');
            const result = await db.collection.find({}).toArray();

            return result;
        } catch (error) {
            console.error('Error fetching scooters:', error);
            throw new Error('Failed to fetch scooters');
        } finally {
            if (db) {
                await db.client.close();
            }
        }
    },

    getScooter: async function getScooter(id) {
        let db;

        try {
            const db = await database.getCollection('scooters');
            const result = await db.collection
                .aggregate([
                    {
                        $match: { _id: new ObjectId(id) }
                    },
                    {
                        $lookup: {
                            from: 'scooters',
                            localField: '_id',
                            foreignField: 'scooterId',
                            as: 'scooters'
                        }
                    }
                ])
                .toArray();

            return result;
        } catch (error) {
            console.error('Error fetching scooter:', error);
            throw new Error('Failed to fetch scooter');
        } finally {
            if (db) {
                await db.client.close();
            }
        }
    },

    updateScooter: async function updateScooter(scooterId, updatedData) {
        let db;

        try {
            const db = await database.getCollection('scooters');
            const result = await db.collection.updateOne(
                { _id: new ObjectId(scooterId) },
                { $set: updatedData }
            );

            // Check for matches and updates
            if (result.matchedCount === 0) {
                throw new Error('No scooter found with the given ID.');
            }
            return result;
        } finally {
            if (db) {
                await db.client.close();
            }
        }
    },

    deleteOneScooter: async function deleteOneScooter(id) {
        let db;
        try {
            const db = await database.getCollection('scooters');
            const result = await db.collection.deleteOne({
                _id: new ObjectId(id)
            });

            return result;
        } catch (error) {
            console.error('Error deleting Scooter from database:', error);
            throw new Error('Scooter deletion failed');
        } finally {
            if (db) {
                await db.client.close();
            }
        }
    },

};

export default scooters;
