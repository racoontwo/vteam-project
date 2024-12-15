import dotenv from 'dotenv';
dotenv.config();

import database from './modules/scooter_db.js';
import Scooter from './scooter.js';
import {getRandomCoordinates, getRandomBatteryLevel} from './simulation.js'



async function main() {
    let showAll = await database.getAllScooters('scooters');
    console.log(showAll);
    
    let deleted = await database.removeScooter(1);
    console.log(deleted);


    // const randomCoordinates = getRandomCoordinates();
    // console.log(`Generated Coordinates: Latitude = ${randomCoordinates.latitude}, Longitude = ${randomCoordinates.longitude}`);
    // const scooter = new Scooter(randomCoordinates);
    let newScooter = new Scooter();
    newScooter.printInfo();



    // let added = await database.addScooter(newScooter);
    // console.log(added);

}

main();

