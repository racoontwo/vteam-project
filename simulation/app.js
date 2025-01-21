
import dotenv from 'dotenv';
dotenv.config();

import database from './modules/db.js';
import cities from './modules/cities_db.js';
// import { startSimulateTrip, simulateWithUsers } from './scooter_pool.js'
import Scooter from './scooter.js';
import { moveScooters } from './modules/simulation.js';

//remove console logs.
//assign parking when arrival is done
//look at battery depletion if possible
//get teo to get them visible again.

//need to configure the gathering/update
// 1 - getAllScooters
// 2 - getAllUsers
// 2.5 - create Objects of all the scooters.
// 3 - assign a user to each scooter
// 4 - start the renting process
// 5 - set 1 second interval for each update for every scooter?
// 


//assign users /set rented, user.
//make movement /set speed, update location
//arrival /set speed, arrived=true
//park /set user=null, status=available


// docker compose up --build

//update all scooters to "available" in start of simulation?

//simulation       | Scooter could not be rented
//simulation exited with code 0


//teo - går det att få de som är tillgängliga att vara gröna, de som är rented att vara röda?
//när karta uppdaterar sig i admin så går den direkt till Malmö.

// simulation process -> 
// --> check if rented?, if it is, check the next one until "available".

async function assignUsers() {
    let scooterObjects = [];
    const MAX_SIMULATIONS = parseInt(process.env.MAX_SIMULATIONS, 10) || 10; // Default max 10
    try {
        let scooters = await database.getAll('scooters');
        let customers = await database.getAll('customers');

        if (scooters && scooters.length > 0) {
            // Create scooter objects with a maximum limit
            scooterObjects = Scooter.createScootersFromJSON(scooters, MAX_SIMULATIONS);

            // Assign customer IDs to scooters
            scooterObjects.forEach((scooter, i) => {
                console.log("rented by:", customers[i]?._id);
                scooter.setStatus('available');
                scooter.rent(customers[i]?._id || null);
                scooter.printInfo();
            });

            console.log(`${scooterObjects.length} scooters added to simulation.`);
        }
    } catch (error) {
        console.error('Error during simulation:', error.message);
    }

    return scooterObjects; // Return the scooter objects if no errors occurred
}

async function runSimulation() {
    
    let rentedScooters = await assignUsers();
    let cityData = await cities.getAllCities();
    await moveScooters(rentedScooters, cityData);

}


// Main function to initialize the simulation
(async function main() {
    try {
        if (process.env.NODE_ENV === 'dev') {
            console.log('Running simulation in development mode...');
                await runSimulation();

        } else if (process.env.NODE_ENV === 'prod') {
            console.log('Running simulation with users in production mode...');
            // await simulateWithUsers();
        } else {
            console.warn('NODE_ENV is not set or has an invalid value. Please set it to "dev" or "prod".');
        }
    } catch (error) {
        console.error('Error during simulation:', error.message);
    }
})();

// Detta program är tänkt att köra i varje cykel och styra/övervaka den. CHECK
// Cykeln meddelar dess position med jämna mellanrum.
// Cykeln meddelar om den kör eller står stilla och vilken hastighet den rör sig i. 
// Man skall kunna stänga av/stoppa en cykel så att den inte kan köras längre. CHECK

// När en kund hyr cykeln är det möjligt att starta den och köra.
// Kunden kan lämna tillbaka en cykel och släppa kontrollen över den.

// Cykeln varnar när den behöver laddas.
// Cykeln sparar en logg över sina resor med start (plats, tid) och slut (plats, tid) samt kund.
// När cykeln tas in för underhåll eller laddning så markeras det att cykeln är i underhållsläge. En cykel som laddas på en laddstation kan inte hyras av en kund och en röd lampa visar att den inte är tillgänglig.


// (async function main() {
//     try {
//         if (process.env.NODE_ENV === 'dev') {
//             console.log('Running simulation in development mode...');
            
//             let scooters = await database.getAll('scooters');
//             console.log(scooters);
//             let customers = await database.getAll('customers');

//             if (scooters && scooters.length > 0) {
//                 let firstScooterID = scooters[0]._id;
//                 let firstCustomerID = customers[0]._id;
//                 await startSimulateTrip(firstCustomerID, firstScooterID);
//             } else {
//                 console.log('No scooters found in the collection.');
//             }
//         } else if (process.env.NODE_ENV === 'prod') {
//             console.log('Running simulation with users in production mode...');
//             // await simulateWithUsers();
//         } else {
//             console.warn('NODE_ENV is not set or has an invalid value. Please set it to "dev" or "prod".');
//         }
//     } catch (error) {
//         console.error('Error during simulation:', error.message);
//     }
// })();