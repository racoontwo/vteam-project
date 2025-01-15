import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayerGroup, Circle, Rectangle } from 'react-leaflet';
import L from 'leaflet';

function Map({ isLoggedIn }) {
    const [scooters, setScooters] = useState(null);
    const [cities, setCities] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        // Fetch scooters from the API
        const fetchScooter = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/v1/scooters/all-scooters`, {
                    headers: {  
                        'x-api-key': apiKey,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch scooters');
                }
                const data = await response.json();
                setScooters(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        // Fetch cities from the API
        const fetchCities = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/v1/cities/all-cities`, {
                    headers: {  
                        'x-api-key': apiKey,
                    },
                });

                if (!response.ok) {
                    console.log(response);
                    throw new Error('Failed to fetch cities');
                }
                const data = await response.json();
                setCities(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchScooter();
        fetchCities();
    }, [baseUrl]);

    console.log(cities);

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

    if (!isLoggedIn) {
        return (
            <div className="map">
                <h2>Please log in to view this page.</h2>
            </div>
        );
    }

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
                    {scooters.data.map(scooter => (
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

export default Map;
