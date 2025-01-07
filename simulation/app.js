import dotenv from 'dotenv';
dotenv.config();

// import scooterbase from './modules/scooter_db.js';
import database from './modules/db.js';
import Scooter from './scooter.js';
import {jondoe, getRandomCoordinates, getRandomBatteryLevel, addTen, addWithCoordinates, addTenWithCoordinates } from './utilities.js'
import { ObjectId } from 'mongodb';
import { calculateDistance, interpolateCoords, simulateMovementWithSpeed } from './modules/locationTracker.js';
import cities  from './modules/cities_db.js'



// async function liveFeed() {
//     let scooters = [];
//     try {
//         const scootersData = await scooterbase.getAllScooters('scooters');
//         scooters = scootersData.map(scooterData => Scooter.createFromDb(scooterData));

//         scooters.forEach(scooter => {
//             scooter.startPrintingLocation();
//         });


//     } catch (error) {
//         console.error('Error loading scooters or monitoring:', error.message);
//     }
// }


async function simulateStartTrip(userID, scooterID) {
    try {
        // Load the scooter object based on its ID
        let scooter = await Scooter.loadObjectScooter(scooterID);
        simulateMovementWithSpeed(scooter.location, getRandomCoordinates(), process.env.SCOOTER_SPEED); // Simulate movement
    } catch (error) {
        console.error('Error simulating trip:', error.message);
    }
}

async function getCities() {
    try {
        const result = await database.getAll('cities_locations');
        return result;
    } catch (error) {
        console.error('Error fetching scooters:', error);
        throw new Error('Failed to fetch scooters');
    }
}

let result = await getCities();
console.log(result);


// Main function to initialize the simulation
// (async function main() {
//     try {
//         // Get the collection of scooters
//         let scooters = await getScooters();

//         if (scooters && scooters.length > 0) {
//             // Get the first scooter's ID
//             let firstScooterID = scooters[0]._id;

//             // Simulate a trip for the first scooter
//             await simulateStartTrip(jondoe._id, firstScooterID);
//             console.log(`Simulation started for user: ${jondoe._id}, scooter: ${firstScooterID}`);
//         } else {
//             console.log('No scooters found in the collection.');
//         }
//     } catch (error) {
//         console.error('Error during simulation:', error.message);
//     }
// })();



// Example Usage:
// const startCoords = { latitude: 10.0, longitude: 20.0 };
// const endCoords = { latitude: 10.5, longitude: 20.5 };
// const speedKmh = 20000; // 20 km/h
// const updateInterval = 1000; // Update every second (1000 ms)

// const distanceBetween = calculateDistance(startCoords, endCoords);
// console.log(distanceBetween);

// simulateMovementWithSpeed(startCoords, endCoords, speedKmh, updateInterval);


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

