
import cities from './cities_db.js'

// Location tracker module
export const locationTracker = {
    location: "Initial Location",
    printLiveLocation() {
        console.log(this.location);
    },
    startLiveLocation() {
        this.liveLocationInterval = setInterval(() => {
            this.printLiveLocation();
        }, 10000);
    },
    stopLiveLocation() {
        clearInterval(this.liveLocationInterval);
    }
};

// Start live location tracking
// locationTracker.startLiveLocation();

// Stop tracking after 30 seconds
// setTimeout(() => {
//     locationTracker.stopLiveLocation();
//     console.log("Stopped tracking location.");
// }, 30000);

// Function to calculate the distance between two points using the Haversine formula
export function calculateDistance(coordA, coordB) {
    const R = 6371; // Earth's radius in km
    const toRadians = angle => angle * (Math.PI / 180);
    const dLat = toRadians(coordB.latitude - coordA.latitude);
    const dLng = toRadians(coordB.longitude - coordA.longitude);

    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRadians(coordA.latitude)) *
              Math.cos(toRadians(coordB.latitude)) *
              Math.sin(dLng / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

// Function to interpolate between two coordinates
export function interpolateCoords(start, end, fraction) {
    return {
        latitude: start.latitude + fraction * (end.latitude - start.latitude),
        longitude: start.longitude + fraction * (end.longitude - start.longitude),
    };
}

// export function simulateMovementWithSpeed(start, end, speedKmh) {
//     const updateInterval = 500;
//     const totalDistance = calculateDistance(start, end); // Total distance in km
//     const speedPerMs = speedKmh / 3600000; // Speed in km/ms
//     const stepDistance = speedPerMs * updateInterval; // Distance covered per update interval
//     let fraction = 0; // Start at the beginning

//     console.log(`Total distance: ${totalDistance.toFixed(2)} km`);
//     console.log(`Starting simulation at ${speedKmh} km/h...`);

//     const intervalId = setInterval(() => {
//         // Calculate the fraction of distance covered
//         fraction += stepDistance / totalDistance;

//         // Stop the simulation if we've reached or exceeded the destination
//         if (fraction >= 1) {
//             console.log(`ARRIVED! Destination: Latitude: ${end.latitude}, Longitude: ${end.longitude}`);
//             clearInterval(intervalId);
//             return true;
//         }

//         // Interpolate the current position
//         const currentCoords = interpolateCoords(start, end, fraction);

//         console.log(`Current position: Latitude: ${currentCoords.latitude}, Longitude: ${currentCoords.longitude}`);
//     }, updateInterval);
// }

export function simulateMovementWithSpeed(start, end, speedKmh) {
    const updateInterval = 500;
    const totalDistance = calculateDistance(start, end); // Total distance in km
    const speedPerMs = speedKmh / 3600000; // Speed in km/ms
    const stepDistance = speedPerMs * updateInterval; // Distance covered per update interval
    let fraction = 0; // Start at the beginning

    console.log(`Total distance: ${totalDistance.toFixed(2)} km`);
    console.log(`Starting simulation at ${speedKmh} km/h...`);

    return new Promise((resolve) => {
        const intervalId = setInterval(() => {
            // Calculate the fraction of distance covered
            fraction += stepDistance / totalDistance;

            // Stop the simulation if we've reached or exceeded the destination
            if (fraction >= 1) {
                console.log(`ARRIVED! Destination: Latitude: ${end.latitude}, Longitude: ${end.longitude}`);
                clearInterval(intervalId);
                resolve(true); // Resolve the promise
            } else {
                // Interpolate the current position
                const currentCoords = interpolateCoords(start, end, fraction);
                console.log(`Current position: Latitude: ${currentCoords.latitude}, Longitude: ${currentCoords.longitude}`);
            }
        }, updateInterval);
    });
}

export async function simulateMovementWithScooter(scooter, destination) {
    const updateInterval = 500; // in ms
    const totalDistance = calculateDistance(scooter.location, destination); // Total distance in km
    const speedPerMs = scooter.speed / 3600000; // Speed in km/ms
    const stepDistance = speedPerMs * updateInterval; // Distance covered per update interval
    let fraction = 0; // Start at the beginning
    let distanceTraveled = 0; // Track total distance traveled

    console.log(`Total distance: ${totalDistance.toFixed(2)} km`);
    console.log(`Starting simulation at ${scooter.speed} km/h with ${scooter.battery}% battery.`);

    return new Promise((resolve) => {
        const intervalId = setInterval(() => {
            if (scooter.battery <= 0) {
                console.log("Battery depleted. Simulation stopped.");
                clearInterval(intervalId);
                resolve(false); // Resolve the promise indicating failure
                return;
            }

            // Update the distance traveled
            distanceTraveled += stepDistance;

            // Update battery level (1 unit per km)
            scooter.battery = Math.max(0, scooter.battery - Math.floor(distanceTraveled));

            // Calculate the fraction of distance covered
            fraction = distanceTraveled / totalDistance;

            // Stop the simulation if we've reached or exceeded the destination
            if (fraction >= 1) {
                scooter.location = destination; // Update the scooter's location to the destination
                console.log(`ARRIVED! Destination: Latitude: ${destination.latitude}, Longitude: ${destination.longitude}`);
                clearInterval(intervalId);
                resolve(true); // Resolve the promise indicating success
            } else {
                // Interpolate the current position
                const currentCoords = interpolateCoords(scooter.location, destination, fraction);
                scooter.location = currentCoords; // Update the scooter's location
                // console.log(`Current position: Latitude: ${currentCoords.latitude}, Longitude: ${currentCoords.longitude}, Battery: ${scooter.battery}%`);
            }
        }, updateInterval);
    });
}

export async function getRandomCoordinates(cityName) {
    try {
        const center = await cities.getDriveZone(cityName);
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

export async function canIPark(cityName, location) {
    const parkZones = await cities.getParkingZones(cityName);
    // console.log(parkZones);
    const DEFAULT_RADIUS_KM = 0.01;

    const toRadians = (degrees) => (degrees * Math.PI) / 180;

    const haversineDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Earth's radius in km
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    };

    for (const zone of parkZones) {
        const radius = zone.radius_km2 || DEFAULT_RADIUS_KM;
        const distance = haversineDistance(
            location.latitude,
            location.longitude,
            zone.latitude,
            zone.longitude
        );

        if (distance <= radius) {
            return true;
        }
    }

    return "Location is not within any park zone";
}



// // Example Usage:
// const startCoords = { latitude: 10.0, longitude: 20.0 };
// const endCoords = { latitude: 20.0, longitude: 30.0 };
// const totalDuration = 5000; // 5 seconds
// const interval = 500; // Update every 0.5 seconds

// simulateMovement(startCoords, endCoords, totalDuration, interval);
