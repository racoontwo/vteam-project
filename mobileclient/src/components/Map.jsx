import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Rectangle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import { TbScooter } from "react-icons/tb";
import { GiBattery50 } from "react-icons/gi";

function Map() {
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

        // fetch every 10 seconds
        const interval = setInterval(() => {
            fetchScooter();
            console.log("fetching scooters");
        }, 10000);

        return () => clearInterval(interval);
    }, [baseUrl]);

    const scooterIcon = new L.Icon({
        iconUrl: 'scooter.png',
        iconSize: [30, 30],
        iconAnchor: [12, 25],
        popupAnchor: [0, -30]
    });


    return (
        <div className="map">
            {loading && <h2>Loading...</h2>}
            {error && <p>{error}</p>}
            {selectedCity && scooters && (
                <MapContainer center={[selectedCity.driveZone.latitude, selectedCity.driveZone.longitude]} zoom={12}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {scooters.data.filter(scooter => scooter.status === 'available').map(scooter => (
                        <Marker
                            key={scooter._id}
                            position={[scooter.location.latitude, scooter.location.longitude]}
                            icon={scooterIcon}
                        >
                            <Popup>
                                <div className="popup-content">
                                    <TbScooter className="scooter-icon" />
                                    <div className="scooter-info">
                                        <h3>Scooter</h3>
                                        <p><GiBattery50 />{scooter.battery}%</p>
                                    </div>
                                </div>
                                    <button>Rent</button>
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
