
import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from "mongodb";
import { ObjectId } from 'mongodb';
import { getCollection } from './db.js';


const collectionName = "scooters";

async function getAllCities(collectionName) {
    try {
        const db = await getCollection(collectionName); // Use the getCollection function
        const result = await db.collection.find({}).toArray();

        console.log(result);

        await db.client.close();
        return result;
    } catch (error) {
        console.error('Error fetching scooters:', error);
        throw new Error('Failed to fetch scooters');
    }
}

// let result = getAllCities(collectionName);
// console.log(result);

export default {  
    getAllCities,
};

