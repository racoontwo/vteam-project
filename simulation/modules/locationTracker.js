
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

export function simulateMovementWithSpeed(start, end, speedKmh) {
    const updateInterval = 500;
    const totalDistance = calculateDistance(start, end); // Total distance in km
    const speedPerMs = speedKmh / 3600000; // Speed in km/ms
    const stepDistance = speedPerMs * updateInterval; // Distance covered per update interval
    let fraction = 0; // Start at the beginning

    console.log(`Total distance: ${totalDistance.toFixed(2)} km`);
    console.log(`Starting simulation at ${speedKmh} km/h...`);

    const intervalId = setInterval(() => {
        // Calculate the fraction of distance covered
        fraction += stepDistance / totalDistance;

        // Stop the simulation if we've reached or exceeded the destination
        if (fraction >= 1) {
            console.log(`ARRIVED! Destination: Latitude: ${end.latitude}, Longitude: ${end.longitude}`);
            clearInterval(intervalId);
            return true;
        }

        // Interpolate the current position
        const currentCoords = interpolateCoords(start, end, fraction);

        console.log(`Current position: Latitude: ${currentCoords.latitude}, Longitude: ${currentCoords.longitude}`);
    }, updateInterval);
}

export function getCoordinates() {

}


// // Example Usage:
// const startCoords = { latitude: 10.0, longitude: 20.0 };
// const endCoords = { latitude: 20.0, longitude: 30.0 };
// const totalDuration = 5000; // 5 seconds
// const interval = 500; // Update every 0.5 seconds

// simulateMovement(startCoords, endCoords, totalDuration, interval);
