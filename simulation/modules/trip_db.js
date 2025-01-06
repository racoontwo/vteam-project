
import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from "mongodb";
import { ObjectId } from 'mongodb';

const collectionName = "trips";

// Connect to the database
async function connectDB() {
    let dsn = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@elsparkcyklar.svx9m.mongodb.net/?retryWrites=true&w=majority&appName=Elsparkcyklar`;

    // Uses a local database for testing
    if (process.env.NODE_ENV === "test") {
        dsn = `mongodb://localhost:27017/test`;
    }

    const client = await MongoClient.connect(dsn);
    const db = client.db()

    return {
        db: db,
        client: client
    };
}

// Get the collection you want from the database
async function getCollection(collectionName) {
    const database = await connectDB();
    const collection = database.db.collection(collectionName) 
    return {
        collection: collection,
        client: database.client
    };
}

async function getAllTrips(collectionName) {
    try {
        const db = await getCollection(collectionName);
        const result = await db.collection.find({}).toArray();

        await db.client.close();
        return result;
    } catch (error) {
        console.error('Error fetching trips:', error);
        throw new Error('Failed to fetch trips');
    }
}

async function getTrip(tripId) {
    try {
        const { collection, client } = await getCollection('trips');

        const trip = await collection.findOne({ _id: new ObjectId(tripId) });

        await client.close();

        if (!trip) {
            throw new Error(`No trip found with ID: ${tripId}`);
        }

        return trip;
    } catch (error) {
        console.error('Error fetching trip:', error);
        throw new Error('Failed to fetch trip');
    }
}

async function addTrip(scooter) {
    try {
        const { collection, client } = await getCollection('trips');
        const result = await collection.insertOne({
            scooterID: scooter.location,
            user: scooter.user,
            status: scooter.status,
            battery: scooter.battery,
        });

        await client.close();
        return result;
    } catch (error) {
        console.error('Failed to insert scooter into database:', error);
        throw new Error('Database insertion failed: ' + error.message);
    }
}


async function listCollections() {
    try {
        const { db, client } = await connectDB(); // Reuse the connectDB function

        const collections = await db.listCollections().toArray();

        await client.close();
        return collections.map(collection => collection.name);
    } catch (error) {
        console.error('Error listing collections:', error);
        throw new Error('Failed to list collections');
    }
}

export default { 
    connectDB, 
    getCollection,
    getAllTrips,
    getTrip,
    addTrip,
    listCollections
};
