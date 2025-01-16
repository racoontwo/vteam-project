
import dotenv from 'dotenv';
dotenv.config();

import database from './db.js';

const collectionName = 'customers';

async function addCustomer(user) {
    try {
        const { collection, client } = await database.getCollection(collectionName);
        
        const result = await collection.insertOne({
            // MongoDB automatically generates an ObjectID for _id
            firstName:       user.firstName,
            lastName:        user.lastName,
            email:           user.email,
            _passwordHash:   user.passwordHash,
            oathID:          user.oathID,
            balance:         user.balance,
            tripLog:         user.tripLog,
            paymentHistory:  user.paymentHistory
        });

        await client.close();
        return result;
    } catch (error) {
        console.error('Failed to insert user into database:', error);
        throw new Error('Database insertion failed: ' + error.message);
    }
}


export default {  
    addCustomer
};
