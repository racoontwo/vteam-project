
import dotenv from 'dotenv';
dotenv.config();

import database from './db.js';

const collectionName = 'cities_locations';

async function getAllCities() {
    try {
        const db = await database.getCollection(collectionName); // Use the getCollection function
        const result = await db.collection.find({}).toArray();

        console.log(result);

        await db.client.close();
        return result;
    } catch (error) {
        console.error('Error fetching cities_location:', error);
        throw new Error('Failed to fetch cities_location');
    }
}

let result = await getAllCities();
console.log(result);

export default {  
    getAllCities,
};
