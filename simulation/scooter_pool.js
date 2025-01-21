import dotenv from 'dotenv';
dotenv.config();

import database from './modules/db.js';
import Scooter from './scooter.js';
import { canIPark, getRandomCoordinates } from './modules/simulation.js';

const RENTING_PERCENTAGE = parseFloat(process.env.RENTING_PERCENTAGE) || 50;
const MAX_SIMULATIONS = parseInt(process.env.MAX_SIMULATIONS, 10) || 100; // Default max 100

//For tomorrow. 
//check if we can remove all console logs and
//how to solve the update problem for the scooters

export async function startSimulateTrip(userID, scooterID) {
    try {
        const scooter = await Scooter.loadObjectScooter(scooterID);
        if (!scooter) return console.warn('Error loading scooter');

        const destination = await getRandomCoordinates(scooter.city);

        
        // console.log(scooter.city);
        scooter.setStatus('available');
        // scooter.setUser(null);
        // scooter.setBattery(90);

        const rented = await scooter.rent(userID);
        if (!rented) return console.warn('Scooter could not be rented');

        const arrived = await scooter.rideToDestination(destination);
        if (!arrived) {
            // console.warn('Scooter did not arrive at the destination.');
            if (scooter.batteryLow()) {
                // console.log('Battery is low. Initiating charging process...');
                await scooter.charge();
            }
            return;
        }

        const parkingSpot = await canIPark(scooter.city, destination);
        if (!parkingSpot) return console.warn('No parking spot available. Please try another location.');

        await scooter.park();
        // scooter.printInfo();
    } catch (error) {
        console.error('Error simulating trip:', error.message);
    }
}

export async function simulateWithUsers() {
    try {
        // Get the collections of customers and scooters
        let customers = await database.getAll('customers');
        let scooters = await database.getAll('scooters');

        if (scooters && scooters.length > 0) {
            // Shuffle the customers array to randomize selection
            customers = customers.sort(() => Math.random() - 0.5);

            // Calculate the number of customers who should rent scooters
            const numRenting = Math.floor((RENTING_PERCENTAGE / 100) * customers.length);

            // Determine the maximum number of simulations we can run
            const maxSimulations = Math.min(numRenting, scooters.length, MAX_SIMULATIONS);

            // Limit the selection to the maximum allowed simulations
            const selectedCustomers = customers.slice(0, maxSimulations);

            // Create an array of promises for all the simulations
            let simulationPromises = [];

            for (let i = 0; i < selectedCustomers.length; i++) {
                // Get the current customer's ID and the next available scooter's ID
                let customerID = selectedCustomers[i]._id;
                let scooterID = scooters[i]._id;

                // Add the simulation to the promises array
                simulationPromises.push(startSimulateTrip(customerID, scooterID));
            }

            // Run all simulations concurrently
            await Promise.all(simulationPromises);

            console.log(`All simulations completed (${simulationPromises.length} simulations).`);
        } else {
            console.log('No scooters found in the collection.');
        }
    } catch (error) {
        console.error('Error during simulation:', error.message);
    }
}
