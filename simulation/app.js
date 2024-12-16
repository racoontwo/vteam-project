import dotenv from 'dotenv';
dotenv.config();

import database from './modules/scooter_db.js';
import Scooter from './scooter.js';
import {getRandomCoordinates, getRandomBatteryLevel, addTen, addWithCoordinates, addTenWithCoordinates } from './simulation.js'
import { ObjectId } from 'mongodb';

//next step would maybe be to put all these functions into the scooter-object.
//setting up the location-component so that the location data is updated/given randomly.
//creating connection in the backend to handle the scooter-data

//vem tar ansvar för cities, parkingzones, 


async function addOne() {
    let newScooter = new Scooter();
    let added = await database.addScooter(newScooter);
    console.log(added);
    return newScooter
}

async function countScooters() {
    try {
        const count = await database.countScooters();
        console.log(`Total number of scooters: ${count}`);
        return count;
    } catch (error) {
        console.error("Error counting scooters:", error);
    }
}

async function pullScooter(input) {
    let scooterID = new ObjectId(input)
    let scooter = await database.getScooter(scooterID)
    return scooter
}

async function updateLocation(scooterID, location) {
    let updated = await database.updateLocation(scooterID, location);
    return updated
}


async function showAll() {
    let showAll = await database.getAllScooters('scooters');
    console.log(showAll);
    return showAll;
}

async function deleteScooter(id) {
    let deleted = await database.removeScooter(id);
    console.log(deleted);
}

async function deleteAll() {
    let deleted = await database.dropScooters();
    console.log(deleted);
}

async function main() {
    // let aScooter = await addOne();
    // let result = addTenWithCoordinates();
    // console.log(result);
    let number = await countScooters();
    console.log(number);
    // let allScooters = await showAll();
    // let allScooters = await deleteAll();
    // console.log(allScooters);

    // let randomLocation = getRandomCoordinates();

    // await database.updateLocation("675f347fc5f69112b668a879", randomLocation);
    // let aScooter = await pullScooter("675f347fc5f69112b668a879");
    // console.log(aScooter);

    // let newOne = new Scooter();
    // newOne.printInfo();
}

main();

