import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayerGroup, Circle, Rectangle } from 'react-leaflet';
import L from 'leaflet';

function Home({}) {
    const [scooters, setScooters] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    // const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseUrl = "http://localhost:4000";
    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        let isMounted = true;

        const fetchScooters = async () => {
            try {
                const response = await fetch(`${baseUrl}/scooters`);
                if (!response.ok) {
                    throw new Error('Failed to fetch customer');
                }
                const data = await response.json();
                if (isMounted) {
                    setScooters(data);
                }
            } catch (error) {
                if (isMounted) {
                    setError(error.message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchScooters();

        return () => {
            isMounted = false;
        };
    }, [baseUrl]);

    console.log(scooters);

    const cityCoordinates = [55.60001020081065, 13.00668850676118]; // Malmö
    const greenCenterCoordinates = [55.60001020081065, 13.00668850676118];
    const redCenterCoordinates = [55.65001020081065, 13.00668850676118];
    const blueCenterCoordinates = [55.55001020081065, 13.00668850676118];
    const rectangle = [[55.60001020081065, 13.00668850676118], [55.65001020081065, 13.20668850676118]];

    const blue = { color: 'blue' }
    const red = { fillColor: 'red' }
    const green = { fillColor: 'green' }

    const scooterIcon = new L.Icon({
        iconUrl: 'scooter.png',
        iconSize: [30, 30],
        iconAnchor: [12, 25],
        popupAnchor: [0, -30]
    });

    return (
        <div className="map">
            <h1>Map</h1>
            {loading && <h2>Loading...</h2>}
            {error && <p>{error}</p>}
            {scooters && (
                <MapContainer center={cityCoordinates} zoom={12}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {scooters.map(scooter => (
                        <Marker
                            key={scooter._id}
                            position={[scooter.location.latitude, scooter.location.longitude]}
                            icon={scooterIcon}
                        >
                            <Popup>
                                <h2>Scooter location</h2>
                                <button>delete</button>
                            </Popup>
                        </Marker>
                    ))}
                    <Circle 
                        center={blueCenterCoordinates} 
                        pathOptions={blue} 
                        radius={1500} />
                    <Circle
                        center={redCenterCoordinates}
                        pathOptions={red}
                        radius={700}
                        stroke={false}
                    />
                    <Circle
                        center={greenCenterCoordinates}
                        pathOptions={green}
                        radius={1000}
                        stroke={false}
                    />
                    <Rectangle 
                        bounds={rectangle}
                        stroke={false}
                        pathOptions={green}
                    />
                </MapContainer>
            )}
        </div>
    );
}

export default Home;
