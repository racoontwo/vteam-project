import database from '../../db/database.mjs';
import { ObjectId } from 'mongodb';

const collectionName = 'cities_location';

const cities = {
    getAllCities: async function getAllCities() {
        let db;

        try {
            const db = await database.getCollection(collectionName);
            const result = await db.collection.find({}).toArray();

            return result;
        } catch (error) {
            console.error('Error fetching the data:', error);
            throw new Error('Failed to fetch cities');
        } finally {
            if (db) {
                await db.client.close();
            }
        }
    },

    getCity: async function getCity(cityName) {
        let db;

        try {
            const db = await database.getCollection(collectionName);
            const result = await db.collection.find(new ObjectId(cityName)).toArray();

            return result;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error('Failed to fetch city data');
        } finally {
            if (db) {
                await db.client.close();
            }
        }
    },
};

export default cities;
