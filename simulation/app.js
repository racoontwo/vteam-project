import dotenv from 'dotenv';
dotenv.config();

import database from './modules/scooter_db.js';
import Scooter from './scooter.js';
import {getRandomCoordinates, getRandomBatteryLevel, addTen, addWithCoordinates, addTenWithCoordinates } from './utilities.js'
import { ObjectId } from 'mongodb';

// create update function that writes to the database. - done


// async function liveFeed() {
//     let scooters = [];
//     try {
//         const scootersData = await database.getAllScooters('scooters');
//         scooters = scootersData.map(scooterData => Scooter.createFromDb(scooterData));

//         scooters.forEach(scooter => {
//             scooter.startPrintingLocation();
//         });


//     } catch (error) {
//         console.error('Error loading scooters or monitoring:', error.message);
//     }
// }

// async function rentScooter(userID, scooterID) {
//     try {
//         const scootersData = await database.getAllScooters('scooters');

//         scooters.forEach(scooter => {
//             scooter.startPrintingLocation();
//         });


//     } catch (error) {
//         console.error('Error loading scooters or monitoring:', error.message);
//     }
// }

// async function getCollectionData() {
//     let data = [];
//     try {
//         // const getCollectionData = await database.listCollections();
//         const getCollectionData = await database.getAllScooters('scooters');
//         console.log(getCollectionData);

//     } catch (error) {
//         console.error('Error loading scooters or monitoring:', error.message);
//     }

// }

async function testRent() {
        try {
            // const getCollectionData = await database.listCollections();
            let scooter = await Scooter.loadObjectScooter("6761f728b2bfdd488eb5c71e");
            scooter.startTrip();
    
        } catch (error) {
            console.error('Error loading scooters or monitoring:', error.message);
        }
    
    }

// getCollectionData();
// liveFeed();
testRent();


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
//var 30 sekund så sparas datan


//next Meeting
// - can we get a user to rent a scooter?
// - get the scooters to show up in frontend map

// - work together to create "rent" in frontend and backend. 
//