import dotenv from 'dotenv';
dotenv.config();

import database from './modules/db.js';
import Scooter from './scooter.js';
import { canIPark, getRandomCoordinates } from './modules/locationTracker.js';

console.log(process.env.AMOUNT_OF_SCOOTERS);
console.log(process.env.PERCENT_TO_RUN);

//For tomorrow. 
//check if we can remove all console logs and
//how to solve the update problem for the scooters


async function simulateStartTrip(userID, scooterID) {
    try {
        // Load the scooter object based on its ID
        const cityName = 'Malmö'; // Change this variable to fetch data for another city
        let scooter = await Scooter.loadObjectScooter(scooterID);
        let destination = await getRandomCoordinates(cityName);

        //User rents the scooter
        // Simulate movement and wait for it to complete
        // const arrived = await simulateMovementWithSpeed(scooter.location, destination, process.env.SCOOTER_SPEED);
        await scooter.rent(userID);
        const arrived = await scooter.rideToDestination(destination);

        if (arrived) {
            console.log('Checking to see if parking is available...');
            const parkingSpot = await canIPark(cityName, destination);
            if (parkingSpot) {
                await scooter.park();
            }
        }
    } catch (error) {
        console.error('Error simulating trip:', error.message);
    }
}

export default async function simulateWithUsers() {
    try {
        // Get the collections of customers and scooters
        let customers = await database.getAll('customers');
        let scooters = await database.getAll('scooters');

        if (scooters && scooters.length > 0) {
            // Create an array of promises for all the simulations
            let simulationPromises = [];

            for (let i = 0; i < customers.length && i < scooters.length; i++) {
                // Get the current customer's ID and the next available scooter's ID
                let customerID = customers[i]._id;
                let scooterID = scooters[i]._id;

                // Log the start of the simulation
                console.log(`Simulation queued for user: ${customerID}, scooter: ${scooterID}`);

                // Add the simulation to the promises array
                simulationPromises.push(simulateStartTrip(customerID, scooterID));
            }

            // Run all simulations concurrently
            await Promise.all(simulationPromises);

            console.log('All simulations completed.');
        } else {
            console.log('No scooters found in the collection.');
        }
    } catch (error) {
        console.error('Error during simulation:', error.message);
    }
}

simulateWithUsers();

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