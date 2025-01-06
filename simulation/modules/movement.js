// Function to calculate the distance between two points using the Haversine formula
function calculateDistance(coordA, coordB) {
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
function interpolateCoords(start, end, fraction) {
    return {
        latitude: start.latitude + fraction * (end.latitude - start.latitude),
        longitude: start.longitude + fraction * (end.longitude - start.longitude),
    };
}
