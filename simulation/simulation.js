
export function getRandomCoordinates() {
    const latitude = (Math.random() * 180 - 90).toFixed(6); // Latitude range: -90 to +90
    const longitude = (Math.random() * 360 - 180).toFixed(6); // Longitude range: -180 to +180
    return { latitude, longitude };
}

export function getRandomBatteryLevel() {
        return Math.floor(Math.random() * 100) + 1;
    }