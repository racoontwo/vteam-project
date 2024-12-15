

import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from "mongodb";

const collectionName = "scooters";

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
    // return database.collection(collectionName);
    return {
        collection: collection,
        client: database.client
    };
}

async function getAllScooters(collectionName) {
    try {
        const db = await getCollection(collectionName); // Use the getCollection function
        const result = await db.collection.find({}).toArray();

        await db.client.close();
        return result;
    } catch (error) {
        console.error('Error fetching scooters:', error);
        throw new Error('Failed to fetch scooters');
    }
}

async function addScooter(scooter) {
    try {
        const { collection, client } = await getCollection('scooters');
        const result = await collection.insertOne({
            _id: scooter._id,
            location: scooter.location,
            status: scooter.status,
            battery: scooter.battery,
            tripLog: scooter.tripLog,
        });

        await client.close();
        return result;
    } catch (error) {
        console.error('Failed to insert scooter into database:', error);
        throw new Error('Database insertion failed: ' + error.message);
    }
}

async function removeScooter(scooterId) {
    try {
        const { collection, client } = await getCollection('scooters');

        const result = await collection.deleteOne({ _id: scooterId });

        await client.close();
        
        if (result.deletedCount === 0) {
            throw new Error(`No scooter found with ID: ${scooterId}`);
        }

        return result;
    } catch (error) {
        console.error('Failed to remove scooter from database:', error);
        throw new Error('Database removal failed: ' + error.message);
    }
}



export default { connectDB, getCollection, getAllScooters, addScooter, removeScooter };
