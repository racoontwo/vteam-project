import dotenv from 'dotenv';
dotenv.config();

import database from './modules/scooter_db.js';
import Scooter from './scooter.js';
import cities from './modules/cities_db.js'
import { faker } from '@faker-js/faker';



export const jondoe = {
    _id: "id123456789",
    name: "Jon Doe",
    email: "jondoe@odduser.com",
    balance: "456 (kontosaldo)",
    rentalHistory: "[Objectld], (referens till Trips)",
    paymentHistory: "[Objectld], (referens till Betalningar)"
    }


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


export function getRandomCoordinates() {
    const latitude = parseFloat((Math.random() * 180 - 90).toFixed(6)); // Latitude range: -90 to +90
    const longitude = parseFloat((Math.random() * 360 - 180).toFixed(6)); // Longitude range: -180 to +180
    return { latitude, longitude };
}


export function getRandomBatteryLevel() {
        return Math.floor(Math.random() * 100) + 1;
    }

export async function addTen() {
    let scooters = [];
    for (let i = 0; i < 10; i++) {
        let newScooter = new Scooter();
        let added = await database.addScooter(newScooter);
        console.log(`Scooter ${i + 1} added:`, added);
        scooters.push(newScooter);
    }
    return scooters;
}

export async function addWithCoordinates() {
    const randomCoordinates = getRandomCoordinates();
    const scooter = new Scooter(randomCoordinates);
    let added = await database.addScooter(scooter);
    console.log(added);
    return scooter
}

export async function addTenWithCoordinates() {
    let scooters = [];
    for (let i = 0; i < 10; i++) {
        const randomCoordinates = await cities.getRandomCityCoordinates('Malmö');
        console.log(randomCoordinates);
        const newScooter = new Scooter(randomCoordinates);
        let added = await database.addScooter(newScooter);
        console.log(`Scooter ${i + 1} with coordinates added:`, added);
        scooters.push(newScooter);
    }
    return scooters;
}

export async function addOne() {
    await Scooter.createNewScooter();
}

export async function countScooters() {
    try {
        const count = await database.countScooters();
        console.log(`Total number of scooters: ${count}`);
        return count;
    } catch (error) {
        console.error("Error counting scooters:", error);
    }
}

export async function pullScooter(scooterID) {
    let scooter = await database.getScooter(scooterID)
    console.log(scooter);
    return scooter
}

export async function updateLocation(scooterID, location) {
    let updated = await database.updateLocation(scooterID, location);
    return updated
}

export async function showAll() {
    let showAll = await database.getAllScooters('scooters');
    console.log(showAll);
    return showAll;
}

export async function deleteScooter(id) {
    let deleted = await database.removeScooter(id);
    console.log(deleted);
}

export async function deleteAll() {
    let deleted = await database.dropScooters();
    console.log(deleted);
}

export async function updateStatus() {

    let scooterID = "67601629812c4fb1ce02d565";

    const updatedStats = {
        location: getRandomCoordinates(),
        status: "maintenance",
        speed: 20,
        battery: 75,
        tripLog: ["Trip A", "Trip B", "Trip C"]
    };
    
    try {
        const result = await database.updateScooterStats(scooterID, updatedStats);
        if (result) {
            console.log("Scooter stats updated successfully.");
        }
    } catch (error) {
        console.error("Error updating scooter stats:", error.message);
    }
}

export async function rentScooter(scooterID) {
    // Use a default scooter ID if none is provided
    scooterID = scooterID || "6761f728b2bfdd488eb5c71e";
    let scooter = await Scooter.loadObjectScooter(scooterID);
    
    scooter.status = "rented";
    scooter.printInfo();
    await scooter.save();
    
    return scooter;
}


async function utils() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log('Please provide a command (showAll, deleteAll, etc.).');
        process.exit(1);
    }

    const command = args[0];

    switch (command) {
        case 'custom':
            let scooter = await Scooter.loadObjectScooter("6761f728b2bfdd488eb5c71e");
            // console.log(scooter);
            scooter.status = "available";
            scooter.printInfo();
            scooter.save();
            let again = await Scooter.loadObjectScooter("6761f728b2bfdd488eb5c71e");
            again.printInfo();

            break;
        case 'rentScooter':
            await rentScooter("6761f728b2bfdd488eb5c71e");
            break;
        case 'randomUser':
            console.log(randomUser);
            break;
        case 'addScooter':
            await util.addOne();
            break;
        case 'showAll':
            await showAll();
            break;
        case 'deleteAll':
            await deleteAll();
            break;
        case 'addOne':
            await addOne();
            break;
        case 'addTen':
            await addTenWithCoordinates();
            break;
        case 'pullScooter':
            if (args.length < 2) {
                console.log('Please provide a scooter ID.');
                process.exit(1);
            }
            await pullScooter(args[1]);
            break;
        case 'updateLocation':
            if (args.length < 3) {
                console.log('Please provide a scooter ID and location.');
                process.exit(1);
            }
            const scooterID = args[1];
            const location = args.slice(2).join(' ');
            await updateLocation(scooterID, location);
            break;
        
        case 'count':
            await countScooters();
            break;
        default:
            console.log(`Unknown command: ${command}`);
            console.log('Available commands: showAll, deleteAll, addOne, pullScooter, updateLocation');
            process.exit(1);
    }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    utils();
} else if (process.argv[1] === new URL(import.meta.url).pathname) {
    utils();
}
