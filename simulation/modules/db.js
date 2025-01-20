
import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from "mongodb";

// Connect to the database
async function connectDB() {
    let dsn = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@elsparkcyklar.svx9m.mongodb.net/?retryWrites=true&w=majority&appName=Elsparkcyklar`;

    // Uses a local database for testing
    if (process.env.NODE_ENV === "test") {
        dsn = `mongodb://localhost:27017/test`;
    }

    const client = await MongoClient.connect(dsn);
    const db = client.db();

    return {
        db: db,
        client: client
    };
}

// Get the collection object itself you want from the database
async function getCollection(collectionName) {
    const database = await connectDB();
    const collection = database.db.collection(collectionName);
    return {
        collection: collection,
        client: database.client
    };
}

// Fetches all documents or records from a collection.
async function getAll(collectionName) {
    try {
        const db = await getCollection(collectionName);
        const result = await db.collection.find({}).toArray();

        await db.client.close();
        return result;
    } catch (error) {
        console.error(`Error fetching data from collection "${collectionName}":`, error);
        throw new Error(`Failed to fetch data from collection "${collectionName}"`);
    }
}

// Fetches all documents and then performs a bulkWrite operation, logging the scooters before and after the update
async function updateAll(collectionName, operations) {
    try {
        // Retrieve the collection
        const { collection, client } = await getCollection(collectionName);
        
        // Find the scooters that are going to be updated (based on the operations)
        const scooterIdsToUpdate = operations.filter(op => op.updateOne).map(op => op.updateOne.filter._id);
        const scootersBeforeUpdate = await collection.find({ '_id': { $in: scooterIdsToUpdate } }).toArray();
        
        console.log('Scooters before update:', scootersBeforeUpdate); // Log the scooters before update

        // Perform the bulkWrite operations (e.g., update, delete, insert)
        const result = await collection.bulkWrite(operations);

        // Fetch the scooters after the update
        const scootersAfterUpdate = await collection.find({ '_id': { $in: scooterIdsToUpdate } }).toArray();
        
        console.log('Scooters after update:', scootersAfterUpdate); // Log the scooters after update

        // Close the database connection
        await client.close();

        return result;
    } catch (error) {
        console.error(`Error performing update on collection "${collectionName}":`, error);
        throw new Error(`Failed to perform update on collection "${collectionName}"`);
    }
}


// // Fetches all documents and then performs a bulkWrite operation
// async function updateAll(collectionName, operations) {
//     try {
//         // Retrieve the collection
//         const { collection, client } = await getCollection(collectionName);
        
//         // Fetch all documents
//         const allDocuments = await collection.find({}).toArray();
//         console.log('Fetched Documents:', allDocuments); // Optional: check fetched data

//         // Perform bulkWrite operations (e.g., update, delete, insert)
//         const result = await collection.bulkWrite(operations);

//         // Close the database connection
//         await client.close();

//         return result;
//     } catch (error) {
//         console.error(`Error performing update on collection "${collectionName}":`, error);
//         throw new Error(`Failed to perform update on collection "${collectionName}"`);
//     }
// }



async function dropAll(collectionName) {
    try {
        const { collection, client } = await getCollection(collectionName);

        const result = await collection.deleteMany({});

        await client.close();

        return result;
    } catch (error) {
        console.error('Failed to remove all from database:', error);
        throw new Error('Database removal failed: ' + error.message);
    }
}

// List all collections in the database
async function listCollections() {
    const database = await connectDB();
    try {
        const collections = await database.db.listCollections().toArray();
        console.log("Collections:", collections.map(collection => collection.name));
    } catch (err) {
        console.error("Error listing collections:", err);
    } finally {
        await database.client.close();
    }
}

async function countItems(collectionName) {
    try {
        const { collection, client } = await getCollection(collectionName);

        const count = await collection.countDocuments();

        await client.close();

        return count;
    } catch (error) {
        console.error('Error counting items:', error);
        throw new Error('Failed to count items');
    }
}

// Example usage
// listCollections().catch(console.error);

export default {
    connectDB, 
    getCollection,
    getAll,
    updateAll,
    dropAll,
    listCollections,
    countItems
}