
import cities from './cities_db.js'

export async function moveScooters(scooterObjects, citiesData) {
    // Start the status logging every 10 seconds
    const statusInterval = setInterval(() => {
        logScooterStatuses(scooterObjects);
    }, 10000); // Log every 10 seconds

    const movementPromises = scooterObjects.map(async (scooter) => {
        const cityData = citiesData.find(city => city.city === scooter.city);

        if (cityData) {
            let destination = getRandomCoordinates(cityData.driveZone);
            scooter.setSpeed(process.env.SCOOTER_SPEED);

            const result = await simulateMovement(scooter, destination);
            
            if (result.arrived) {
                console.log(`Scooter in ${scooter.city} has successfully arrived!`);
            } else {
                console.log(`Scooter in ${scooter.city} could not reach the destination.`);
            }
            console.log("Final Scooter State:", result.scooter);
        } else {
            console.error(`City not found for scooter: ${scooter.city}`);
        }
    });

    await Promise.all(movementPromises);
    
    // Stop logging once all scooters have finished their movement
    clearInterval(statusInterval);
}

// Function to simulate movement recursively
export async function simulateMovement(scooter, destination) {
    const SIMULATION_SPEED = process.env.SIMULATION_SPEED || 1000; // Default value of 1 second 
    const speedPerSecond = scooter.speed / 3600; // Convert km/h to km/s

    if (scooter.battery <= 0) {
        console.log("Battery depleted. Scooter cannot continue.");
        return { arrived: false, scooter };
    }

    const distance = getDistance(scooter.location, destination);

    if (distance <= 0.01) { // Consider arrival if within 10 meters
        console.log(`Arrived at Destination: { latitude: ${destination.latitude}, longitude: ${destination.longitude} }`);
        return { arrived: true, scooter };
    }

    // Update scooter position towards destination
    scooter.location.latitude += (destination.latitude - scooter.location.latitude) * (speedPerSecond / distance);
    scooter.location.longitude += (destination.longitude - scooter.location.longitude) * (speedPerSecond / distance);
    scooter.battery -= 1;

    // console.log(`Current Position: { latitude: ${scooter.location.latitude}, longitude: ${scooter.location.longitude} }, Battery: ${scooter.battery}`);

    await new Promise(resolve => setTimeout(resolve, SIMULATION_SPEED));

    return simulateMovement(scooter, destination);
}

// Function to log the current status of all scooters
function logScooterStatuses(scooterObjects) {
    console.log("---- Scooter Status Update ----");
    scooterObjects.forEach((scooter, index) => {
        console.log(`Scooter ${index + 1} in ${scooter.city}:`);
        console.log(`  Location: { latitude: ${scooter.location.latitude}, longitude: ${scooter.location.longitude} }`);
        console.log(`  Battery: ${scooter.battery}`);
    });
    console.log("--------------------------------");
}


// export async function moveScooters(scooterObjects, citiesData) {
//     const movementPromises = scooterObjects.map(async (scooter) => {
//         const cityData = citiesData.find(city => city.city === scooter.city);

//         if (cityData) {
//             let destination = getRandomCoordinates(cityData.driveZone);
//             scooter.setSpeed(process.env.SCOOTER_SPEED);

//             const result = await simulateMovement(scooter, destination);
            
//             if (result.arrived) {
//                 console.log("Scooter has successfully arrived!");
//             } else {
//                 console.log("Scooter could not reach the destination.");
//             }
//             console.log("Final Scooter State:", result.scooter);
//         } else {
//             console.error(`City not found for scooter: ${scooter.city}`);
//         }
//     });

//     await Promise.all(movementPromises);
// }

// export async function simulateMovement(scooter, destination) {
//     const SIMULATION_SPEED = process.env.SIMULATION_SPEED || 1000; //Default value of 1 second 
//     const speedPerSecond = scooter.speed / 3600; // Convert km/h to km/s

//     if (scooter.battery <= 0) {
//         console.log("Battery depleted. Scooter cannot continue.");
//         return { arrived: false, scooter };
//     }

//     const distance = getDistance(scooter.location, destination);

//     if (distance <= 0.01) { // Consider arrival if within 10 meters
//         console.log(`Arrived at Destination: { latitude: ${destination.latitude}, longitude: ${destination.longitude} }`);
//         return { arrived: true, scooter };
//     }

//     // Update scooter position towards destination
//     scooter.location.latitude += (destination.latitude - scooter.location.latitude) * (speedPerSecond / distance);
//     scooter.location.longitude += (destination.longitude - scooter.location.longitude) * (speedPerSecond / distance);
//     scooter.battery -= 1;

//     console.log(`Current Position: { latitude: ${scooter.location.latitude}, longitude: ${scooter.location.longitude} }, Battery: ${scooter.battery}`);

//     await new Promise(resolve => setTimeout(resolve, SIMULATION_SPEED));

//     return simulateMovement(scooter, destination);
// }



// export async function moveScooters(scooterObjects, citiesData) {
//     const movementPromises = scooterObjects.map(async (scooter) => {
//         const cityData = citiesData.find(city => city.city === scooter.city);

//         if (cityData) {
//             let destination = getRandomCoordinates(cityData.driveZone);
//             scooter.setSpeed(process.env.SCOOTER_SPEED);


//             simulateMovement(scooter, destination).then(result => {
//                 if (result.arrived) {
//                     console.log("Scooter has successfully arrived!");
//                 } else {
//                     console.log("Scooter could not reach the destination.");
//                 }
//                 console.log("Final Scooter State:", result.scooter);
//             });


//             // console.log("Location:", scooter.location);
//             // console.log("Destination:", destination);
//             // let distance = calculateDistance(scooter.location, destination);
//             // console.log("The distance is:", distance);

//             // let arrived = await simulateMovementWithScooter(scooter, destination);
//             // console.log(arrived);
//         } else {
//             console.error(`City not found for scooter: ${scooter.city}`);
//         }
//     });

//     await Promise.all(movementPromises);
// }

// export async function simulateMovement(scooter, destination) {
//     if (scooter.battery <= 0) {
//         console.log("Battery depleted. Scooter cannot continue.");
//         return;
//     }

//     const speedPerSecond = scooter.speed / 3600; // Convert km/h to km/s
//     const distance = getDistance(scooter.location, destination);

//     if (distance <= 0.01) {
//         console.log(`Arrived at Destination: { latitude: ${destination.latitude}, longitude: ${destination.longitude} }`);
//         return;
//     }

//     scooter.location.latitude += (destination.latitude - scooter.location.latitude) * (speedPerSecond / distance);
//     scooter.location.longitude += (destination.longitude - scooter.location.longitude) * (speedPerSecond / distance);
//     scooter.battery -= 1;

//     console.log(`Current Position: { latitude: ${scooter.location.latitude}, longitude: ${scooter.location.longitude} }, Battery: ${scooter.battery}`);

//     // setTimeout(() => simulateMovement(scooter, destination), 100);
//     await new Promise(resolve => setTimeout(resolve, 1000));
//         return updateScooter();
//     }

//     return await updateScooter();
// // }

// Function to calculate the distance between two points using the Haversine formula
export function getDistance(coordA, coordB) {
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

    // console.log(`Total distance: ${totalDistance.toFixed(2)} km`);
    // console.log(`Starting simulation at ${speedKmh} km/h...`);

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

    const depletionRate = parseFloat(process.env.BATTERY_DEPLETION_RATE) || 1; // Default to 1 if not set
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

            // Update battery level based on depletion rate (1 unit per km * rate)
            scooter.battery = Math.max(0, scooter.battery - Math.floor(distanceTraveled * depletionRate));

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
                console.log(`Current position: Latitude: ${currentCoords.latitude}, Longitude: ${currentCoords.longitude}, Battery: ${scooter.battery}%`);
            }
        }, updateInterval);
    });
}


// export async function simulateMovementWithScooter(scooter, destination) {
//     const updateInterval = 500; // in ms
//     const totalDistance = calculateDistance(scooter.location, destination); // Total distance in km
//     const speedPerMs = scooter.speed / 3600000; // Speed in km/ms
//     const stepDistance = speedPerMs * updateInterval; // Distance covered per update interval
//     let fraction = 0; // Start at the beginning
//     let distanceTraveled = 0; // Track total distance traveled

//     console.log(`Total distance: ${totalDistance.toFixed(2)} km`);
//     console.log(`Starting simulation at ${scooter.speed} km/h with ${scooter.battery}% battery.`);

//     return new Promise((resolve) => {
//         const intervalId = setInterval(() => {
//             if (scooter.battery <= 0) {
//                 console.log("Battery depleted. Simulation stopped.");
//                 clearInterval(intervalId);
//                 resolve(false); // Resolve the promise indicating failure
//                 return;
//             }

//             // Update the distance traveled
//             distanceTraveled += stepDistance;

//             // Update battery level (1 unit per km)
//             scooter.battery = Math.max(0, scooter.battery - Math.floor(distanceTraveled));

//             // Calculate the fraction of distance covered
//             fraction = distanceTraveled / totalDistance;

//             // Stop the simulation if we've reached or exceeded the destination
//             if (fraction >= 1) {
//                 scooter.location = destination; // Update the scooter's location to the destination
//                 console.log(`ARRIVED! Destination: Latitude: ${destination.latitude}, Longitude: ${destination.longitude}`);
//                 clearInterval(intervalId);
//                 resolve(true); // Resolve the promise indicating success
//             } else {
//                 // Interpolate the current position
//                 const currentCoords = interpolateCoords(scooter.location, destination, fraction);
//                 scooter.location = currentCoords; // Update the scooter's location
//                 // console.log(`Current position: Latitude: ${currentCoords.latitude}, Longitude: ${currentCoords.longitude}, Battery: ${scooter.battery}%`);
//             }
//         }, updateInterval);
//     });
// }

export function getRandomCoordinates(cityCenter) {

    // const center = await cities.getDriveZone(cityName);
    const { latitude, longitude, radius_km2 } = cityCenter;


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
