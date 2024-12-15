import dotenv from 'dotenv';
dotenv.config();

import database from './modules/scooter_db.js';
import Scooter from './scooter.js';
import {getRandomCoordinates, getRandomBatteryLevel} from './simulation.js'
import { ObjectId } from 'mongodb';


async function addOne() {
    let newScooter = new Scooter();
    let added = await database.addScooter(newScooter);
    console.log(added);
    return newScooter
}

async function addWithCoordinates() {
    const randomCoordinates = getRandomCoordinates();
    const scooter = new Scooter(randomCoordinates);
    let added = await database.addScooter(scooter);
    console.log(added);
    return scooter
}

async function pullScooter(input) {
    let scooterID = new ObjectId(input)
    let scooter = await database.getScooter(scooterID)
    return scooter
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

async function main() {    
    // let aScooter = await addOne();
    let allScooters = await showAll();
    console.log(allScooters);
    
    
    let aScooter = await pullScooter("675f220ef2c7b0371746870e");
    console.log(aScooter.battery);
    // aScooter.printInfo();
}

main();

