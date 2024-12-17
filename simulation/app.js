import dotenv from 'dotenv';
dotenv.config();

import database from './modules/scooter_db.js';
import Scooter from './scooter.js';
import {getRandomCoordinates, getRandomBatteryLevel, addTen, addWithCoordinates, addTenWithCoordinates } from './utilities.js'
import { ObjectId } from 'mongodb';

// create update function that writes to the database.

async function liveFeed() {
    let scooters = [];
    try {
        const scootersData = await database.getAllScooters('scooters');
        scooters = scootersData.map(scooterData => Scooter.createFromDb(scooterData));

        scooters.forEach(scooter => {
            scooter.startPrintingLocation();
        });


    } catch (error) {
        console.error('Error loading scooters or monitoring:', error.message);
    }
}

// Run the function
liveFeed();
