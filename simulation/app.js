import dotenv from 'dotenv';
dotenv.config();

import database from './modules/scooter_db.js';
import Scooter from './scooter.js';
import {getRandomCoordinates, getRandomBatteryLevel, addTen, addWithCoordinates, addTenWithCoordinates } from './utilities.js'
import { ObjectId } from 'mongodb';

// create update function that writes to the database.

async function monitorScooters() {
    try {
        // Fetch all scooters
        const scootersData = await database.getAllScooters('scooters');
        const scooters = scootersData.map(scooterData => new Scooter(scooterData)); // Create Scooter objects

        function printScooterLocations() {
            scooters.forEach(scooter => {
                console.log(`Scooter Location: ${JSON.stringify(scooter.location)}`);
            });
        }

        setInterval(printScooterLocations, 30000);

    } catch (error) {
        console.error('Error loading scooters or monitoring:', error.message);
    }
}

// Run the function
monitorScooters();
