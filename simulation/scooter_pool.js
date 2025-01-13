import dotenv from 'dotenv';
dotenv.config();

import database from './modules/scooter_db.js';
import Scooter from './scooter.js';

console.log(process.env.AMOUNT_OF_SCOOTERS);
console.log(process.env.PERCENT_TO_RUN);

//env-variables:
//percent_to_run = 70
//amount of scooters = 100

//write function that takes the multiplier as an argument, 
// then simulates trips within the app. 

//BIG Question: 
//takes two coordinates, how to simulate the closing of the distance between them two?

//((START))
//1 - loads the scooters from the database (amount of scooters) (
//if !scooter then create newRandomScooter until loop = amount_of_scooters)
//2 - percent_to_run of all that are "available"
//3 - get random destination (within cities)
//4 - create trip (eg create another random destination)
//4.5 - calculate distance between trip. gps?
//5 - startTrip() - 
    // -   changes status to "rented"
    // -   sets pace of 20km/h to between current and destination
    // -   drains battery at 1 unit / km
    // -   while current != destination ? run() : stop()

//((END))
//1 - shuts down all the scooters to be "parked" or "off"


// funktioner att bygga:
//     - Skapa random scooter 
//     - create random trip (within cities) dvs ta två random coordinater 
//       och skapa resa mellan dem två.