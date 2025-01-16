
import dotenv from 'dotenv';
dotenv.config();

import database from './modules/db.js';
// import Scooter from './scooter.js';
import { jondoe, randomUser } from './utilities.js'
// import { canIPark, getRandomCoordinates, simulateMovementWithSpeed } from './modules/locationTracker.js';
// import { simulateStartTrip, simulateWithUsers } from './scooter_pool.js'
import { simulateWithUsers } from './scooter_pool.js'

//next step is Cityname attached to the scooter.
//update all scooters to "available" in start of simulation?


// Detta program är tänkt att köra i varje cykel och styra/övervaka den. CHECK
// Cykeln meddelar dess position med jämna mellanrum.
// Cykeln meddelar om den kör eller står stilla och vilken hastighet den rör sig i. 
// Man skall kunna stänga av/stoppa en cykel så att den inte kan köras längre. CHECK

// När en kund hyr cykeln är det möjligt att starta den och köra.
// Kunden kan lämna tillbaka en cykel och släppa kontrollen över den.

// Cykeln varnar när den behöver laddas.
// Cykeln sparar en logg över sina resor med start (plats, tid) och slut (plats, tid) samt kund.
// När cykeln tas in för underhåll eller laddning så markeras det att cykeln är i underhållsläge. En cykel som laddas på en laddstation kan inte hyras av en kund och en röd lampa visar att den inte är tillgänglig.


// async function simulateStartTrip(userID, scooterID) {
//     try {
//         const cityName = 'Malmö'; // Change this variable to fetch data for another city
//         const scooter = await Scooter.loadObjectScooter(scooterID);
//         const destination = await getRandomCoordinates(cityName);

//         // scooter.setStatus('available');
//         // scooter.setUser(null);
//         // scooter.setBattery(90);

//         const rented = await scooter.rent(userID);

//         if (!rented) {
//             console.warn('Scooter could not be rented');
//             return;
//         }
//         const arrived = await scooter.rideToDestination(destination);

//         if (!arrived) {
//             console.warn('Scooter did not arrive at the destination.');
//             if (scooter.batteryLow()) {
//                 console.log('Battery is low. Initiating charging process...');
//                 await scooter.charge();
//             }
//             return;
//         }

//         const parkingSpot = await canIPark(cityName, destination);

//         if (!parkingSpot) {
//             console.warn('No parking spot available. Please try another location.');
//             return;
//         }

//         await scooter.park();

//         console.log('Ride is finished');
//         scooter.printInfo();
//     } catch (error) {
//         console.error('Error simulating trip:', error.message);
//     }
// }



// Main function to initialize the simulation
(async function main() {
    try {
        if (process.env.NODE_ENV === 'dev') {
            console.log('Running simulation in development mode...');
            
            let scooters = await database.getAll('scooters');

            if (scooters && scooters.length > 0) {
                let firstScooterID = scooters[0]._id;

                console.log(`Simulation started for user: ${jondoe._id}, scooter: ${firstScooterID}`);
                // await simulateStartTrip(jondoe._id, firstScooterID);
                await startSimulateTrip(jondoe._id, firstScooterID);
            } else {
                console.log('No scooters found in the collection.');
            }
        } else if (process.env.NODE_ENV === 'prod') {
            console.log('Running simulation with users in production mode...');
            await simulateWithUsers();
        } else {
            console.warn('NODE_ENV is not set or has an invalid value. Please set it to "dev" or "prod".');
        }
    } catch (error) {
        console.error('Error during simulation:', error.message);
    }
})();


// Main function to initialize the simulation
// (async function main() {
//     try {
//         // Get the collection of scooters
//         let scooters = await database.getAll('scooters');

//         if (scooters && scooters.length > 0) {
//             // Get the first scooter's ID
//             let firstScooterID = scooters[0]._id;

//             // Simulate a trip for the first scooter
//             console.log(`Simulation started for user: ${jondoe._id}, scooter: ${firstScooterID}`);
//             await simulateStartTrip(jondoe._id, firstScooterID);
//         } else {
//             console.log('No scooters found in the collection.');
//         }
//     } catch (error) {
//         console.error('Error during simulation:', error.message);
//     }
// })();

//KRAV
// Detta program är tänkt att köra i varje cykel och styra/övervaka den.
// Cykeln meddelar dess position med jämna mellanrum.
// Cykeln meddelar om den kör eller står stilla och vilken hastighet den rör sig i.
// Man skall kunna stänga av/stoppa en cykel så att den inte kan köras längre.
// När en kund hyr cykeln är det möjligt att starta den och köra.
// Kunden kan lämna tillbaka en cykel och släppa kontrollen över den.
// Cykeln varnar när den behöver laddas.
// Cykeln sparar en logg över sina resor med start (plats, tid) och slut (plats, tid) samt kund.
// När cykeln tas in för underhåll eller laddning så markeras det att cykeln är i underhållsläge. En cykel som laddas på en laddstation kan inte hyras av en kund och en röd lampa visar att den inte är tillgänglig.


//tanke kring användning - vid "rent" - ladda cykeln, kör trip, stanna cykeln, spara cykeln, "ändra status"
//skapa Trips-class som är kopplat till användare, cykel laddas, triplog sparas i cykel efter completed trip. 
//kolla med Patrik om det är samma sak som "rentals" - ska vi ha det i back-end till exempel?

