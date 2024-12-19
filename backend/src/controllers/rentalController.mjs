import database from '../../db/database.mjs';

const rentals = {
    getAllRentals: async function getAllRentals() {
        let db;

        try {
            const db = await database.getCollection('rentals');
            const result = await db.collection.find({}).toArray();

            return result;
        } catch (error) {
            console.error('Error fetching rentals:', error);
            throw new Error('Failed to fetch rentals');
        } finally {
            if (db) {
                await db.client.close(); // Ensure the client is always closed
            }
        }
    },

    // getCustomer: async function getCustomer(id) {
    //     let db;

    //     try {
    //         const db = await database.getCollection('customers');
    //         const result = await db.collection.aggregate([
    //             {
    //                 $match: { _id: new ObjectId(id) }
    //             },
    //             {
    //                 $lookup: {
    //                     from: 'rentalHistory',
    //                     localField: '_id',
    //                     foreignField: 'customerId',
    //                     as: 'rentalHistory'
    //                 }
    //             }
    //         ]).toArray();

    //         return result;
    //     } catch (error) {
    //         console.error('Error fetching customer:', error);
    //         throw new Error('Failed to fetch customer');
    //         } finally {
    //             if (db) {
    //                 await db.client.close(); // Ensure the client is always closed
    //             }
    //         }
    // },

    newRental: async function newRental(data) {
        let db;

        try {
            const db = await database.getCollection('rentals');
            const result = await db.collection.insertOne(data);

            return result;
        } catch (error) {
            console.error('Failed to insert data into database:', error);
            throw new Error('Database insertion failed' + error.message);
        } finally {
            if (db) {
                await db.client.close(); // Ensure the client is always closed
            }
        }
    },

    // deleteOneCustomer: async function deleteOneCustomer(id) {
    //     let db;
    //     try {
    //         const db = await database.getCollection('customers');
    //         const result = await db.collection.deleteOne({ _id: new ObjectId(id) });

    //         return result;
    //     } catch (error) {
    //         console.error('Error deleting customer from database:', error);
    //         throw new Error('Customer deletion failed');
    //     } finally {
    //         if (db) {
    //             await db.client.close(); // Ensure the client is always closed
    //         }
    //     }
    // },

    deleteAllRentals: async function deleteAllRentals() {
        let db;

        try {
            const db = await database.getCollection('rentals');
            const result = await db.collection.deleteMany({});
            return result;
        } catch (error) {
            console.error('Error deleting data from MongoDB:', error);
            throw new Error('Database deletion failed');
        } finally {
            if (db) {
                await db.client.close(); // Ensure the client is always closed
            }
        }
    }
};

export default rentals;
