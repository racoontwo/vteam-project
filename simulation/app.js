import dotenv from 'dotenv';
dotenv.config();

import database from './modules/scooter_db.js';
import Scooter from './scooter.js';
import getRandomCoordinates from './simulation.js';



async function main() {
    let result = await database.getAllScooters('scooters');
    console.log(result);
    const randomCoordinates = getRandomCoordinates();
    console.log(`Generated Coordinates: Latitude = ${randomCoordinates.latitude}, Longitude = ${randomCoordinates.longitude}`);
    const scooter = new Scooter(3, randomCoordinates);
    scooter.printInfo();

}

main();

