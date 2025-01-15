import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Rectangle, useMap } from 'react-leaflet';
import L from 'leaflet';

function Map({ isLoggedIn }) {
    const [scooters, setScooters] = useState(null);
    const [cities, setCities] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
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
                    throw new Error('Failed to fetch cities');
                }
                const data = await response.json();
                setCities(data);
                setSelectedCity(data.data[0]);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchScooter();
        fetchCities();
    }, [baseUrl]);

    const handleCityChange = (event) => {
        const cityId = event.target.value;
        const city = cities.data.find(city => city._id === cityId);
        setSelectedCity(city);
        console.log(selectedCity);
        console.log("parkZones", selectedCity.parkZones);
        console.log("chargingZones", selectedCity.chargingZones);
    };

    const handleDelete = async (scooterId) => {
        try {
            const response = await fetch(`${baseUrl}/api/v1/scooters/delete-one-scooter`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                },
                body: JSON.stringify({ _id: scooterId }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete scooter');
            }

            // Update the state to remove the deleted scooter
            setScooters({ data: scooters.data.filter(scooter => scooter._id !== scooterId) });

        } catch (error) {
            setError(error.message);
        }
    };

    const scooterIcon = new L.Icon({
        iconUrl: 'scooter.png',
        iconSize: [30, 30],
        iconAnchor: [12, 25],
        popupAnchor: [0, -30]
    });

    const ChangeMapCenter = ({ center }) => {
        const map = useMap();
        map.setView(center);
        return null;
    };

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
            {cities && (
                <div>
                    <label htmlFor="city-select">Choose a city:</label>
                    <select id="city-select" onChange={handleCityChange}>
                        {cities.data.map(city => (
                            <option key={city._id} value={city._id}>{city.city}</option>
                        ))}
                    </select>
                </div>
            )}
            {selectedCity && scooters && (
                <MapContainer center={[selectedCity.driveZone.latitude, selectedCity.driveZone.longitude]} zoom={12}>
                    <ChangeMapCenter center={[selectedCity.driveZone.latitude, selectedCity.driveZone.longitude]} />
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
                                <h2>{scooter._id}</h2>
                                <p>Status: {scooter.status}</p>
                                <p>Battery: {scooter.battery}</p>
                                <p>Speed: {scooter.speed}</p>
                                <button onClick={() => handleDelete(scooter._id)}>Delete</button>
                            </Popup>
                        </Marker>
                    ))}
                    <Circle
                        center={[selectedCity.driveZone.latitude, selectedCity.driveZone.longitude]}
                        pathOptions={{ fillColor: 'green' }}
                        stroke={false}
                        radius={selectedCity.driveZone.radius_km2 * 1000}
                    >
                        <Popup>
                            <h2>{selectedCity.city}</h2>
                        </Popup>
                    </Circle>
                    {selectedCity.parkZones.map((zone, index) => (
                        <Circle
                            key={index}
                            center={[zone.latitude, zone.longitude]}
                            pathOptions={{ color: 'blue' }}
                            stroke={false}
                            radius={1000} // TODO: Change to zone.radius_km2 * 1000
                        >
                            <Popup>
                                <h2>{zone.name}</h2>
                            </Popup>
                        </Circle>
                    ))}
                    {selectedCity.chargingZones.map((zone, index) => (
                        <Circle
                            key={index}
                            center={[zone.latitude, zone.longitude]}
                            pathOptions={{ color: 'red' }}
                            stroke={false}
                            radius={zone.radius_km2 * 1000}
                        >
                            <Popup>
                                <h2>{zone.name}</h2>
                            </Popup>
                        </Circle>
                    ))}
                </MapContainer>
            )}
        </div>
    );
}

export default Map;
