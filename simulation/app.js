//this would be the simulation-app in the end.

import dotenv from 'dotenv';
dotenv.config();

import database from './modules/scooter_db.js';
import Scooter from './scooter.js';

let result = await database.getAllScooters('scooters');
console.log(result);

async function main() {
    // const scooter = new Scooter(3, randomCoordinates);
    // scooter.getAllInfo();
}

main();
