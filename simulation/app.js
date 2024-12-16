import dotenv from 'dotenv';
dotenv.config();

import database from './modules/scooter_db.js';
import Scooter from './scooter.js';
import {getRandomCoordinates, getRandomBatteryLevel, addTen, addWithCoordinates, addTenWithCoordinates } from './simulation.js'
import { ObjectId } from 'mongodb';


async function addOne() {
    let newScooter = new Scooter();
    let added = await database.addScooter(newScooter);
    console.log(added);
    return newScooter
}

async function countScooters() {
    try {
        const count = await database.countScooters();
        console.log(`Total number of scooters: ${count}`);
        return count;
    } catch (error) {
        console.error("Error counting scooters:", error);
    }
}

async function pullScooter(scooterID) {
    let scooter = await database.getScooter(scooterID)
    return scooter
}

async function updateLocation(scooterID, location) {
    let updated = await database.updateLocation(scooterID, location);
    return updated
}


async function showAll() {
    let showAll = await database.getAllScooters('scooters');
    console.log(showAll);
    return showAll;
}

async function deleteScooter(id) {
    let deleted = await database.removeScooter(id);
    console.log(deleted);
}

async function deleteAll() {
    let deleted = await database.dropScooters();
    console.log(deleted);
}

async function updateStatus() {

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

async function main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log('Please provide a command (showAll, deleteAll, etc.).');
        process.exit(1);
    }

    const command = args[0];

    switch (command) {
        case 'custom':
            await Scooter.updateStatus("676072699bbf8ed45f57d2d4");
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


main();

