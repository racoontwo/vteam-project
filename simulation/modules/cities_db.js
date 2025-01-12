
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

// Function to return the parking zones for a specific city
async function getDriveZone(cityName) {
    try {
        const city = await getCityData(cityName);
        return city.driveZone;
    } catch (error) {
        console.error(`Error fetching drive zone for "${cityName}":`, error);
        throw error;
    }
}

// function to get random coordinates within a city
async function getRandomCityCoordinates(cityName) {
    try {
        const center = await getDriveZone(cityName);
        const { latitude, longitude, radius_km2 } = center;

        // Convert radius from square kilometers to a circular radius in kilometers
        const radius = Math.sqrt(radius_km2);

        // Convert radius to degrees (approximately, assuming Earth is a sphere)
        const radiusInDegrees = radius / 111; // 111 km ~ 1 degree of latitude

        const angle = Math.random() * 2 * Math.PI;

        const distance = Math.random() * radiusInDegrees;

        const deltaLat = distance * Math.cos(angle);
        const deltaLon = distance * Math.sin(angle) / Math.cos(latitude * (Math.PI / 180));

        const randomLat = latitude + deltaLat;
        const randomLon = longitude + deltaLon;

        return {
        latitude: randomLat,
        longitude: randomLon,
        };
    } catch (error) {
        console.error(`Error fetching drive zone for "${cityName}":`, error);
        throw error;
    }
}

export default {  
    getAllCities,
    getCityData,
    getParkingZones,
    getDriveZone,
    getRandomCityCoordinates
};
