
import dotenv from 'dotenv';
dotenv.config();

import database from './db.js';

const collectionName = 'cities_locations';

async function getAllCities() {
    try {
        const db = await database.getCollection(collectionName);
        const result = await db.collection.find({}).toArray();

        await db.client.close();
        return result;
    } catch (error) {
        console.error('Error fetching cities_location:', error);
        throw new Error('Failed to fetch cities_location');
    }
}

// Function to fetch data for a specific city
async function getCityData(cityName) {
    try {
        const cities = await getAllCities();
        const city = cities.find(c => c.city === cityName);

        if (!city) {
            throw new Error(`City "${cityName}" not found.`);
        }
        return city;
    } catch (error) {
        console.error(`Error fetching data for city "${cityName}":`, error);
        throw error;
    }
}

// Function to return the parking zones for a specific city
async function getParkingZones(cityName) {
    try {
        const city = await getCityData(cityName);
        return city.parkZones;
    } catch (error) {
        console.error(`Error fetching parking zones for "${cityName}":`, error);
        throw error;
    }
}


// example usage 
// let result = await getAllCities();
// console.log(result);


// let result = await getCityData('Växjö');
// console.log(result);

export default {  
    getAllCities,
    getCityData,
    getParkingZones
};
