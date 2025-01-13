
import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from "mongodb";
import { ObjectId } from 'mongodb';

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

async function getScooter(scooterId) {
    try {
        const { collection, client } = await getCollection('scooters');

        const scooter = await collection.findOne({ _id: new ObjectId(scooterId) });

        await client.close();

        if (!scooter) {
            throw new Error(`No scooter found with ID: ${scooterId}`);
        }

        return scooter;
    } catch (error) {
        console.error('Error fetching scooter:', error);
        throw new Error('Failed to fetch scooter');
    }
}

async function addScooter(scooter) {
    try {
        const { collection, client } = await getCollection('scooters');
        const result = await collection.insertOne({
            // _id: The mongodb will give the scooter an ID with ObjectID
            location: scooter.location,
            user: scooter.user,
            status: scooter.status,
            speed: scooter.speed,
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

async function dropScooters() {
    try {
        const { collection, client } = await getCollection('scooters');

        const result = await collection.deleteMany({});

        await client.close();

        return result;
    } catch (error) {
        console.error('Failed to remove all scooters from database:', error);
        throw new Error('Database removal failed: ' + error.message);
    }
}

async function updateLocation(scooterID, location) {
    try {
        const { collection, client } = await getCollection('scooters');

        const result = await collection.updateOne(
            { _id: new ObjectId(scooterID) },
            { $set: { location: location } }
        );

        await client.close(); // Ensure the client is closed

        if (result.matchedCount !== 1) {
            throw new Error("Error updating location.");
        }

        return true;
    } catch (e) {
        console.error('Failed to update location:', e);
        return false;
    }
}

async function updateScooter(scooterID, updatedStats) {
    try {
        const { collection, client } = await getCollection('scooters');

        const result = await collection.updateOne(
            { _id: new ObjectId(scooterID) },
            { $set: updatedStats }
        );

        await client.close();

        if (result.matchedCount !== 1) {
            throw new Error("Error updating scooter stats. Scooter not found.");
        }

        return true;
    } catch (e) {
        console.error('Failed to update scooter stats:', e);
        return false;
    }
}

async function updateScooterStats(scooterID, updatedStats) {
    try {
        const { collection, client } = await getCollection('scooters');

        const result = await collection.updateOne(
            { _id: new ObjectId(scooterID) },
            { $set: updatedStats }
        );

        await client.close();

        if (result.matchedCount !== 1) {
            throw new Error("Error updating scooter stats. Scooter not found.");
        }

        return true;
    } catch (e) {
        console.error('Failed to update scooter stats:', e);
        return false;
    }
}


async function countScooters() {
    try {
        const { collection, client } = await getCollection('scooters');

        const count = await collection.countDocuments(); // count documents in the 'scooters' collection

        await client.close();

        return count;
    } catch (error) {
        console.error('Error counting scooters:', error);
        throw new Error('Failed to count scooters');
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
    getAllScooters, 
    addScooter, 
    removeScooter, 
    getScooter, 
    dropScooters,
    updateLocation,
    countScooters,
    updateScooterStats,
    updateScooter,
    listCollections
};
