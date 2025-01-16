import dotenv from 'dotenv';
dotenv.config();

import database from './modules/db.js';
import customer_db from './modules/customer_db.js';
import { faker } from '@faker-js/faker';

// Collections: [ 'apiKeys', 'customers', 'cities_locations', 'scooters' ]


export const randomUser = {
        // Generate random first name, last name, and email
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet
        .email(
            faker.person.firstName(),
            faker.person.lastName()
        )
        .toLowerCase(),
        passwordHash: 'pw-hashed-123',
        oathID: 'oathID',
        balance: faker.number.int({ min: 500, max: 5000 }),
        tripLog: 'ref_to_trip_log_object',
        paymentHistory: 'transactions'
}

export async function showAll(collectionName) {
    let showAll = await database.getAll(collectionName);
    console.log(showAll);
    return showAll;
}

export async function addCustomer(user) {
    let result = await customer_db.addCustomer(user);
    console.log(result);
    return result;
}

export async function addMultiple(number) {
    for (let i = 0; i < number; i++) {
        const newUser = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet
                .email(
                    faker.person.firstName(),
                    faker.person.lastName()
                )
                .toLowerCase(),
            passwordHash: 'pw-hashed-123',
            oathID: 'oathID',
            balance: faker.number.int({ min: 500, max: 5000 }),
            tripLog: 'ref_to_trip_log_object',
            paymentHistory: 'transactions'
        };

        await addCustomer(newUser);
        console.log(`Added user ${i + 1}: ${newUser.email}`);
    }

    console.log(`${number} customers have been added.`);
}

export async function deleteAll() {
    let deleted = await database.dropAll('customers');
    console.log(deleted);
}

async function utils() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log('Please provide a command (showAll, deleteAll, etc.).');
        process.exit(1);
    }

    const command = args[0];

    switch (command) {
        case 'addMultiple':
            const num = parseInt(args[1], 10);
            if (isNaN(num) || num <= 0) {
                console.log('Please provide a valid number of customers to add.');
            } else {
                await addMultiple(num);
            }
            break;
        
        case 'randomUser':
            console.log(randomUser);
            break;
        case 'deleteAll':
            await deleteAll();
            break;
        case 'addCustomer':
            console.log(randomUser);
            await addCustomer(randomUser);
            break;
        case 'showCustomers':
            await showAll('customers');
            break;
        case 'showScooters':
            await showAll('scooters');
            break;
    }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    utils();
} else if (process.argv[1] === new URL(import.meta.url).pathname) {
    utils();
}
