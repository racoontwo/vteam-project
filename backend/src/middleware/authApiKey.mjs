import database from "../../db/database.mjs";

export const authenticateApiKey = async (req, res, next) => {
    let db;
    try {
        const apiKey = req.headers['x-api-key']; // API key passed in the request headers

        if (!apiKey) {
            return res.status(401).json({ error: 'API Key is missing.' });
        }

        const db = await database.getCollection('apiKeys'); // Get collection
        const validApiKeys = await db.collection.find({}).map((doc) => doc.key).toArray(); // Fetch API keys

        if (!validApiKeys.includes(apiKey)) {
            return res.status(403).json({ error: 'Invalid API Key.' });
        }

        next(); // Proceed if the key is valid
    } catch (error) {
        console.error('Error authenticating API key:', error);
        res.status(500).json({ error: 'Internal Server Error.' });
    } finally {
        if (db) {
            await db.client.close(); // Ensure the client is always closed
        }
    }
};


