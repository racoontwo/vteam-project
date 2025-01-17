
import dotenv from 'dotenv';
dotenv.config();

import database from './modules/db.js';
import { startSimulateTrip, simulateWithUsers } from './scooter_pool.js'


// docker compose up --build

//next step is Cityname attached to the scooter.
//update all scooters to "available" in start of simulation?

//implement a 'clear all to fresh-button'

//simulation       | Scooter could not be rented
//simulation exited with code 0


//teo - går det att få de som är tillgängliga att vara gröna, de som är rented att vara röda?


// Detta program är tänkt att köra i varje cykel och styra/övervaka den. CHECK
// Cykeln meddelar dess position med jämna mellanrum.
// Cykeln meddelar om den kör eller står stilla och vilken hastighet den rör sig i. 
// Man skall kunna stänga av/stoppa en cykel så att den inte kan köras längre. CHECK

// När en kund hyr cykeln är det möjligt att starta den och köra.
// Kunden kan lämna tillbaka en cykel och släppa kontrollen över den.

// Cykeln varnar när den behöver laddas.
// Cykeln sparar en logg över sina resor med start (plats, tid) och slut (plats, tid) samt kund.
// När cykeln tas in för underhåll eller laddning så markeras det att cykeln är i underhållsläge. En cykel som laddas på en laddstation kan inte hyras av en kund och en röd lampa visar att den inte är tillgänglig.

// Main function to initialize the simulation
(async function main() {
    try {
        if (process.env.NODE_ENV === 'dev') {
            console.log('Running simulation in development mode...');
            
            let scooters = await database.getAll('scooters');
            let customers = await database.getAll('customers');

            if (scooters && scooters.length > 0) {
                let firstScooterID = scooters[0]._id;
                let firstCustomerID = customers[0]._id;
                await startSimulateTrip(firstCustomerID, firstScooterID);
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
