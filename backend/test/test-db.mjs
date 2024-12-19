process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import db from '../db/database.mjs';

describe('Database Connection', function () {
    it('should connect to the database', async () => {
        try {
            const connection = await db.connectDB();
            expect(connection).to.be.an('object');
            expect(connection.db.databaseName).to.equal('test');
        } catch (error) {
            throw new Error(
                'Failed to connect to the database: ' + error.message
            );
        }
    });

    it('should fetch the chosen collection from the database', async () => {
        try {
            const collection = await db.getCollection('testCollection');
            expect(collection).to.be.an('object');
            expect(collection.collection.collectionName).to.equal(
                'testCollection'
            );
        } catch (error) {
            throw new Error('Failed to fetch the collection: ' + error.message);
        }
    });
});
