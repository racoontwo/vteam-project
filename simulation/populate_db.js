import dotenv from 'dotenv';
dotenv.config();

import database from './modules/db.js';
import customer_db from './modules/customer_db.js';
import scooter_db from './modules/scooter_db.js';
import cities from './modules/cities_db.js';
import { faker } from '@faker-js/faker';

// Collections: [ 'apiKeys', 'customers', 'cities_locations', 'scooters' ]


//set up the objects
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

export async function newScooter(cityName) {
    const scooterObject = {
        location: await cities.getRandomCityCoordinates(cityName),
        user: null,
        status: 'available',
        speed: 0,
        battery: faker.number.int({ min: 10, max: 100 }),
        tripLog: 'tripObject',
        city: cityName,
    };
    return scooterObject;
}

//common functions
export async function showAll(collectionName) {
    let showAll = await database.getAll(collectionName);
    console.log(showAll);
    return showAll;
}

//individual functions
export async function addCustomer(userData) {
    let result = await customer_db.addCustomer(userData);
    console.log(result);
    return result;
}

export async function addScooter(scooterData) {
    let result = await scooter_db.addScooter(scooterData);
    console.log(result);
    return result;
}

export async function addMultipleScooters(number, city) {
    for (let i = 0; i < number; i++) {
        const newScooter = {
            location: await cities.getRandomCityCoordinates(city),
            user: null,
            status: 'available',
            speed: 0,
            battery: faker.number.int({ min: 10, max: 100 }),
            tripLog: 'tripObject',
            city:   city
        };

        await addScooter(newScooter);
        console.log(`Added scooter ${i + 1}: Location [${newScooter.location.latitude}, ${newScooter.location.longitude}]`);
    }

    console.log(`${number} scooters have been added in ${city}.`);
}

export async function addMultipleCustomers(number) {
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

export async function deleteAll(collectionName) {
    let deleted = await database.dropAll(collectionName);
    console.log(deleted);
}

export async function count(collectionName) {
    let result = await database.countItems(collectionName)
    console.log(result);
}


//this function will be called
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
                await addMultipleScooters(num, 'Växjö');
            }
            break;
        case 'randomUser':
            console.log(randomUser);
            break;
        case 'deleteAll':
            await deleteAll('scooters');
            break;
        case 'addScooter':
            console.log(await newScooter('Malmö'));
            // await addScooter(newScooter);
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
        case 'count':
            await count('scooters');
            break;
    }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    utils();
} else if (process.argv[1] === new URL(import.meta.url).pathname) {
    utils();
}
