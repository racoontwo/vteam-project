import dotenv from 'dotenv';
dotenv.config();

import database from './modules/scooter_db.js';
import Scooter from './scooter.js';
import { ObjectId } from 'mongodb';


export function getRandomCoordinates() {
    const latitude = (Math.random() * 180 - 90).toFixed(6); // Latitude range: -90 to +90
    const longitude = (Math.random() * 360 - 180).toFixed(6); // Longitude range: -180 to +180
    return { latitude, longitude };
}

export function getRandomBatteryLevel() {
        return Math.floor(Math.random() * 100) + 1;
    }

export async function addTen() {
    let scooters = [];
    for (let i = 0; i < 10; i++) {
        let newScooter = new Scooter();
        let added = await database.addScooter(newScooter);
        console.log(`Scooter ${i + 1} added:`, added);
        scooters.push(newScooter);
    }
    return scooters;
}

export async function addWithCoordinates() {
    const randomCoordinates = getRandomCoordinates();
    const scooter = new Scooter(randomCoordinates);
    let added = await database.addScooter(scooter);
    console.log(added);
    return scooter
}

export async function addTenWithCoordinates() {
    let scooters = [];
    for (let i = 0; i < 10; i++) {
        const randomCoordinates = getRandomCoordinates();
        const newScooter = new Scooter(randomCoordinates);
        let added = await database.addScooter(newScooter);
        console.log(`Scooter ${i + 1} with coordinates added:`, added);
        scooters.push(newScooter);
    }
    return scooters;
}
