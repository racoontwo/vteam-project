import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Rectangle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import { TbScooter } from "react-icons/tb";
import ReactDOMServer from "react-dom/server";

function Map({ isLoggedIn }) {
    // State variables
    const [scooters, setScooters] = useState(null);
    const [cities, setCities] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [filter, setFilter] = useState('all');
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

    const handleCityChange = (event) => {
        const cityId = event.target.value;
        const city = cities.data.find(city => city._id === cityId);
        setSelectedCity(city);
        console.log(selectedCity);
        console.log("parkZones", selectedCity.parkZones);
        console.log("chargingZones", selectedCity.chargingZones);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredScooters = scooters ? scooters.data.filter(scooter => {
        if (filter === 'all') return true;
        if (filter === 'lowBattery') return scooter.battery < 20;
        if (filter === 'highBattery') return scooter.battery >= 20;
        if (filter === 'rented') return scooter.status === 'rented';
        if (filter === 'available') return scooter.status === 'available';
        return true;
    }) : [];

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

    const scooterIconGreen = new L.DivIcon({
        html: ReactDOMServer.renderToString(
          <div className="scooter-icon" style={{ backgroundColor: 'darkgreen' }}>
              <TbScooter className="icon"  size={24} color="white" />
          </div>
        ),
        className: "custom-icon",
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15],
      });

    const scooterIconRed = new L.DivIcon({
        html: ReactDOMServer.renderToString(
          <div className="scooter-icon" style={{ backgroundColor: 'darkred' }}>
              <TbScooter className="icon"  size={24} color="white" />
          </div>
        ),
        className: "custom-icon",
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15],
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
            {loading && <h2>Loading...</h2>}
            {error && <p>{error}</p>}
            {cities && (
                <div className="page-header">
                    <h1>Map</h1>
                    <div className='map-options'>
                        <label htmlFor="city-select">Choose a city:</label>
                        <select id="city-select" onChange={handleCityChange}>
                            {cities.data.map(city => (
                                <option key={city._id} value={city._id}>{city.city}</option>
                            ))}
                        </select>
                        <label htmlFor="filter">Filter by:</label>
                        <select id="filter" value={filter} onChange={handleFilterChange}>
                            <option value="all">All</option>
                            <option value="lowBattery">Low Battery</option>
                            <option value="highBattery">High Battery</option>
                            <option value="rented">Rented</option>
                            <option value="available">Available</option>
                        </select>
                    </div>
                </div>
            )}
            {selectedCity && scooters && (
                <MapContainer center={[selectedCity.driveZone.latitude, selectedCity.driveZone.longitude]} zoom={12}>
                    <ChangeMapCenter center={[selectedCity.driveZone.latitude, selectedCity.driveZone.longitude]} />
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {filteredScooters.map(scooter => (
                        <Marker
                            key={scooter._id}
                            position={[scooter.location.latitude, scooter.location.longitude]}
                            icon={scooter.status === 'available' ? scooterIconGreen : scooterIconRed}
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
                            radius={zone.radius_km2 * 1000}
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
