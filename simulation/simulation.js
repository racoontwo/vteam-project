// Generate random coordinates
export default function getRandomCoordinates() {
    const latitude = (Math.random() * 180 - 90).toFixed(6); // Latitude range: -90 to +90
    const longitude = (Math.random() * 360 - 180).toFixed(6); // Longitude range: -180 to +180
    return { latitude, longitude };
}