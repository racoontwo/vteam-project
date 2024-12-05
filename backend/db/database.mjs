import { MongoClient } from "mongodb";

// Connect to the database
async function connectDB() {
    let dsn = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@elsparkcyklar.svx9m.mongodb.net/?retryWrites=true&w=majority&appName=Elsparkcyklar`;

    // Uses a local database for testing
    if (process.env.NODE_ENV === "test") {
        dsn = `mongodb://localhost:27017/test`;
    }

    const client = await MongoClient.connect(dsn);
    const db = client.db()

    return db;
}

// Get the collection you want from the database
async function getCollection(collectionName) {
    const database = await connectDB();

    return database.collection(collectionName);
}

export default { connectDB, getCollection };
